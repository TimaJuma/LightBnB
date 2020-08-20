-- SELECT all reservations of guest#1 / now()::date - to get todays date

SELECT properties.id, title, cost_per_night, start_date, avg(rating) as avg_rating
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id 
WHERE reservations.guest_id = 1
AND end_date < now()::date
GROUP BY properties.id, reservations.id
ORDER BY start_date;