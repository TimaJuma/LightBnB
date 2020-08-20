-- INSERT queries

INSERT INTO users (name, email, password)
VALUES
('tima juma', 'tima@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('aiman sapar', 'aiman@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('alula malik', 'alula@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties (title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, city, post_code, owner_id)
VALUES 
('house', 'house for family and big companies', 'https://cdn.vox-cdn.com/thumbor/XUdUk_rKJ8WDTd0zksnnicYDwbY=/0x0:3760x2500/1200x800/filters:focal(1580x950:2180x1550)/cdn.vox-cdn.com/uploads/chorus_image/image/65135516/shutterstock_349464740.0.jpg', 'cover.com', 200, 3070, 30, 10, 10, 'Canada', 'Kelowna', 'V2S 4A5', 1),
('townhouse', 'asian style townhouse in the city centre', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/brewster-mcleod-architects-1486154143.jpg?crop=1.00xw:1.00xh;0,0&resize=480:*', 'apartment-cover.com', 400, 250, 1, 1, 1, 'US', 'Tampa Bay', 'T3J T22', 2),
('small apartment', 'its a pretty small new train station', 'https://d2skuhm0vrry40.cloudfront.net/2020/articles/2020-03-19-14-22/animal-crossing-house-upgrades-expansions-costs-7018-1584627775997.jpg/EG11/resize/1200x-1/animal-crossing-house-upgrades-expansions-costs-7018-1584627775997.jpg', 'small-cover.com', 120, 2222, 3, 2, 2, 'Belgium', 'Antwerpen', 'B12B34', 3);

INSERT INTO rates (start_date, end_date, cost_per_night, property_id) 
VALUES
('2019-03-03', '2019-03-04', 200, 1),
('2019-02-10', '2019-02-11', 400, 2),
('2019-10-09', '2019-10-15', 120, 3);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES
('2020-03-03', '2020-03-04', 3, 1), --user 1 reserve property 3
('2020-02-10', '2020-02-11', 2, 2), --user 2 reserve property 2
('2020-07-09', '2020-07-15', 1, 3); -- user 3 reserver property 1

INSERT INTO guest_reviews (guest_id, owner_id, reservation_id, rating, message) 
VALUES
(1, 3, 1, 5, 'this guest is okay'),
(2, 1, 2, 3, 'this guest is rude'),
(3, 2, 3, 0, 'this guest is anti-social');

INSERT INTO property_reviews (guest_id, reservation_id, property_id, rating, message)
VALUES
(1, 1, 3, 5, 'This was wonderful place, absolutely adorable'),
(2, 2, 1, 4, 'Nice view. Friendly neighboorhood'),
(3, 3, 2, 2, 'Apartment too small');