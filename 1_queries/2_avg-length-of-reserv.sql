-- SELECT average legth of stay/revervation

SELECT AVG(end_date - start_date) as avg_reservations
FROM reservations;