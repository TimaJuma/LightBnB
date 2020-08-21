const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
})


/* ========================= QUERIES ========================= */

/// USERS =======================================================

// Get a single user from the database given their email.
const getUserWithEmail = (email) => {
  return pool.query(`
    SELECT *
    FROM users
    WHERE email = $1
    LIMIT 1;
    `, [email])
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      console.error('query error', err.stack);
      return null;
    });
};
exports.getUserWithEmail = getUserWithEmail;


// Get a single user from the database given their id.
const getUserWithId = (id) => {
  return pool.query(`
    SELECT *
    FROM users
    WHERE id = $1
    LIMIT 1;
    `, [id])
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      console.error('query error', err.stack);
      return null;
    });
};
exports.getUserWithId = getUserWithId;


//  Add a new user to the database. 
const addUser =  (user) => {
  return pool.query(`
    INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3)
    RETURNING *;
    `, [user.name, user.email, user.password])
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      console.error('query error', err.stack);
      return null;
    });
};
exports.addUser = addUser;



/// RESERVATIONS ===============================================================================

// Get all reservations for a single user.
const getAllReservations = (guest_id, limit = 10) => {
  return pool.query(`
    SELECT properties.id, title, cost_per_night, start_date, avg(rating) as avg_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id 
    WHERE reservations.guest_id = $1 AND end_date < now()::date
    GROUP BY properties.id, reservations.id
    ORDER BY start_date
    LIMIT $2;
    `, [guest_id, limit])
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      console.error('query error', err.stack);
      return null;
    });
};
exports.getAllReservations = getAllReservations;



/// PROPERTIES

// Get all properties.
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  let queryString = `
  SELECT properties.*, AVG(rating) AS average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    if (queryString.includes('WHERE')) {
      queryString += ` AND `;
    } else {
      queryString += ` WHERE `;
    }

    queryParams.push(Number(options.owner_id));
    queryString += ` owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    if (queryString.includes('WHERE')) {
      queryString += ` AND `;
    } else {
      queryString += ` WHERE `;
    }

    queryParams.push(Number(options.minimum_price_per_night));
    queryString += ` cost_per_night > $${queryParams.length} `;
  }

  if (options.maximum_price_per_night) {
    if (queryString.includes('WHERE')) {
      queryString += ` AND `;
    } else {
      queryString += ` WHERE `;
    }

    queryParams.push(Number(options.maximum_price_per_night));
    queryString += `cost_per_night < $${queryParams.length}`;
  }

  queryString += `
  GROUP BY properties.id
  `;

  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));
    queryString += `HAVING AVG(rating) >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log('QUERY: ', queryString, queryParams);
  return pool.query(queryString, queryParams)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      console.error('query error', err.stack);
      return null;
    });
};

exports.getAllProperties = getAllProperties;


// Add a property to the database
const addProperty = function(property) {
  
  //get the key from passed object
  const propertyKeys = [];
  const propertyValues = [];
  const queryValues = [];


  for (const key in property) {
    propertyKeys.push(key);
    propertyValues.push(`$${propertyKeys.length}`);
    queryValues.push(property[key]);
  }
  

  let addPropQuery = `INSERT INTO properties (${propertyKeys.join(', ')}) 
                        VALUES (${propertyValues.join(', ')})
                        RETURNING *;
                        `;


  return pool.query(addPropQuery, queryValues)
  .then(res => {
    res.rows[0];
  })
  .catch(err => console.err('Query error', err));
}
exports.addProperty = addProperty;
