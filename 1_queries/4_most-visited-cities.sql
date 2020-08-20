-- SELECT most visited cities

SELECT city, COUNT(city) as tot_reservations
FROM reservations
JOIN properties ON property_id = properties.id
GROUP BY city
ORDER BY tot_reservations DESC
LIMIT 5;
