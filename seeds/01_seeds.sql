-- INSERT queries

INSERT INTO users (name, email, password)
VALUES
('tima juma', 'tima@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('aiman sapar', 'aiman@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('alula malik', 'alula@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES 
(1, 'house', 'house for family and big companies', 'https://unsplash.com/images/things/house', 'cover.com', 200, 2, 1, 3, 'Canada', 'Main', 'Kelowna', 'BC', 'V2S 4A5', true),
(2, 'townhouse', 'asian style townhouse in the city centre', 'https://unsplash.com/images/things/house', 'apartment-cover.com', 400, 250, 1, 1, 'US', 'Vivian str.', 'Tampa Bay', 'FL', 'T3J T22', true),
(3, 'apartment', 'its a pretty small new train station', 'https://unsplash.com/images/things/house', 'sth.com', 120, 3, 2, 1, 'Belgium', 'Hagreed', 'Antwerpen', 'GA', 'B12B34', false);

INSERT INTO reservations (start_date, end_date, property_id, guest_id) 
VALUES
('2020-03-03', '2020-03-04', 3, 1), --user 1 reserve property 3
('2020-02-10', '2020-02-11', 2, 2), --user 2 reserve property 2
('2020-07-09', '2020-07-15', 1, 3); -- user 3 reserver property 1

INSERT INTO property_reviews(guest_id, property_id, reservation_id, rating, message)
VALUES
(1, 1, 5, 5, 'This was wonderful place, absolutely adorable'),
(2, 2, 6, 4, 'Nice view. Friendly neighboorhood'),
(3, 3, 7, 2, 'Apartment too small');