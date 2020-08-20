const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
})







/// USERS =====================================================================================

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

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */



const getAllProperties = function(options, limit = 10) {
  const limitedProperties = {};
  for (let i = 1; i <= limit; i++) {
    limitedProperties[i] = properties[i];
  }
  return Promise.resolve(limitedProperties);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
