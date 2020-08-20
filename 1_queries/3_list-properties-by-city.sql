-- SELECT list of properties based ob city and display AVG rating of ech property

SELECT properties.id, title, cost_per_night, AVG(rating) as avg_rating
FROM properties
JOIN property_reviews ON property_id = properties.id
WHERE city LIKE '%ancouv%'
GROUP BY properties.id
HAVING AVG(rating) >= 4
ORDER BY cost_per_night
LIMIT 10;
