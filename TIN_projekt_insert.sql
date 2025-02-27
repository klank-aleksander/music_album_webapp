-- Albumy
Insert into album(name,release_date,picture_link)
values ('3D Country','2022-06-23', 'https://ecsmedia.pl/c/3d-country-plyta-winylowa-b-iext168196723.jpg');

Insert into album(name,release_date,picture_link)
values ('Coney Island Baby','1975-12-01','https://upload.wikimedia.org/wikipedia/en/1/17/Reed_Coney.jpg');

Insert into album(name,release_date,picture_link)
values ('Rubber Soul', '1965-12-03','https://upload.wikimedia.org/wikipedia/en/5/5b/Rubber_Soul.png');

Insert into album(name,release_date,picture_link)
values ('Imaginal Disk', '2024-08-23','https://upload.wikimedia.org/wikipedia/en/4/4b/Magdalena_Bay_-_Imaginal_Disk.png');

Insert into album(name,release_date,picture_link)
values ('Mercurial World', '2021-08-08','https://upload.wikimedia.org/wikipedia/en/b/b9/Mercurial_World.jpeg');

Insert into album(name,release_date,picture_link)
values ('Revolver', '1966-08-05','https://upload.wikimedia.org/wikipedia/en/e/ec/Revolver_%28album_cover%29.jpg');

Insert into album(name,release_date,picture_link)
values ('Abbey Road', '1969-09-26','https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg');

Insert into album(name,release_date,picture_link)
values ('No Name', '2024-07-19','https://upload.wikimedia.org/wikipedia/en/8/86/Jack_White_-_No_Name_cover_art.jpg');


Insert into album(name,release_date,picture_link)
values ('Amnesiac', '2024-05-30','https://upload.wikimedia.org/wikipedia/en/8/8c/Radiohead_-_Amnesiac_cover.png');

Insert into album(name,release_date,picture_link)
values ('OK Computer', '1997-04-16','https://upload.wikimedia.org/wikipedia/en/b/ba/Radioheadokcomputer.png');

Insert into album(name,release_date,picture_link)
values ('In Rainbows', '2007-09-10','https://ecsmedia.pl/c/in-rainbows-b-iext120971159.jpg');

-- Kraje
Insert into country(name)
values ('USA');

Insert into country(name)
values ('UK');

-- Artysci
Insert into artist(name,country_id)
values ('Geese',(Select id from country where name = 'USA'));

Insert into album_artist(artist_id, album_id)
VALUES ((SELECT id from artist where name = 'Geese'),(SELECT id from album where name = '3D Country'));

Insert into artist(name,country_id)
values ('The Beatles',(Select id from country where name = 'UK'));

Insert into artist(name,country_id)
values ('Radiohead',(Select id from country where name = 'UK'));

Insert into album_artist(artist_id, album_id)
VALUES ((SELECT id from artist where name = 'The Beatles'),(SELECT id from album where name = 'Rubber Soul'));

Insert into album_artist(artist_id, album_id)
VALUES ((SELECT id from artist where name = 'The Beatles'),(SELECT id from album where name = 'Revolver'));

Insert into album_artist(artist_id, album_id)
VALUES ((SELECT id from artist where name = 'The Beatles'),(SELECT id from album where name = 'Abbey Road'));

Insert into artist(name,country_id)
values ('Lou Reed',(Select id from country where name = 'USA'));

Insert into album_artist(artist_id, album_id)
VALUES ((SELECT id from artist where name = 'Lou Reed'),(SELECT id from album where name = 'Coney Island Baby'));

Insert into artist(name,country_id)
values ('Magdalena Bay',(Select id from country where name = 'USA'));

Insert into album_artist(artist_id, album_id)
VALUES ((SELECT id from artist where name = 'Magdalena Bay'),(SELECT id from album where name = 'Imaginal Disk'));

Insert into album_artist(artist_id, album_id)
VALUES ((SELECT id from artist where name = 'Magdalena Bay'),(SELECT id from album where name = 'Mercurial World'));

Insert into artist(name,country_id)
values ('Jack White',(Select id from country where name = 'USA'));

Insert into album_artist(artist_id, album_id)
VALUES ((SELECT id from artist where name = 'Jack White'),(SELECT id from album where name = 'No Name'));

Insert into album_artist(artist_id, album_id)
VALUES ((SELECT id from artist where name = 'Radiohead'),(SELECT id from album where name = 'Amnesiac'));

Insert into album_artist(artist_id, album_id)
VALUES ((SELECT id from artist where name = 'Radiohead'),(SELECT id from album where name = 'OK Computer'));

Insert into album_artist(artist_id, album_id)
VALUES ((SELECT id from artist where name = 'Radiohead'),(SELECT id from album where name = 'In Rainbows'));


-- Gatunki
INSERT INTO genre(name)
values ('Rock');

INSERT INTO genre(name)
values ('Blues Rock');

INSERT INTO genre(name)
values ('Synth-pop');

INSERT INTO genre(name)
values ('Psychedelic Rock');

-- Album_Genre

INSERT INTO album_genre(genre_id, album_id)
values ((SELECT id from genre where name = 'Blues Rock'),(SELECT id from album where name = '3D Country'));

INSERT INTO album_genre(genre_id, album_id)
values ((SELECT id from genre where name = 'Rock'),(SELECT id from album where name = 'Coney Island Baby'));

INSERT INTO album_genre(genre_id, album_id)
values ((SELECT id from genre where name = 'Rock'),(SELECT id from album where name = 'Rubber Soul'));

INSERT INTO album_genre(genre_id, album_id)
values ((SELECT id from genre where name = 'Rock'),(SELECT id from album where name = 'Revolver'));

INSERT INTO album_genre(genre_id, album_id)
values ((SELECT id from genre where name = 'Rock'),(SELECT id from album where name = 'Abbey Road'));

INSERT INTO album_genre(genre_id, album_id)
values ((SELECT id from genre where name = 'Psychedelic Rock'),(SELECT id from album where name = 'Revolver'));

INSERT INTO album_genre(genre_id, album_id)
values ((SELECT id from genre where name = 'Synth-pop'),(SELECT id from album where name = 'Imaginal Disk'));

INSERT INTO album_genre(genre_id, album_id)
values ((SELECT id from genre where name = 'Synth-pop'),(SELECT id from album where name = 'Mercurial World'));

INSERT INTO album_genre(genre_id, album_id)
values ((SELECT id from genre where name = 'Blues Rock'),(SELECT id from album where name = 'No Name'));

INSERT INTO album_genre(genre_id, album_id)
values ((SELECT id from genre where name = 'Rock'),(SELECT id from album where name = 'Amnesiac'));

INSERT INTO album_genre(genre_id, album_id)
values ((SELECT id from genre where name = 'Rock'),(SELECT id from album where name = 'OK Computer'));

INSERT INTO album_genre(genre_id, album_id)
values ((SELECT id from genre where name = 'Rock'),(SELECT id from album where name = 'In Rainbows'));

-- Top_albums
INSERT INTO top_albums(album_id)
values ((select id from album where name = 'OK Computer'));

INSERT INTO top_albums(album_id)
values ((select id from album where name = 'Abbey Road'));

INSERT INTO top_albums(album_id)
values ((select id from album where name = 'No Name'));

INSERT INTO top_albums(album_id)
values ((select id from album where name = 'Imaginal Disk'));

INSERT INTO top_albums(album_id)
values ((select id from album where name = 'In Rainbows'));

# user

INSERT INTO user(email, password, role)
values ('alek@wp.pl','$2b$12$EVry7xKQBMj1DWzq6m6CouUrCSd88GVcWmSVUykUzy5PXE5pL/Ioq','user');

INSERT INTO user(email, password, role)
values ('admin@wp.pl','$2b$12$4dEJhLvjbrQypQ0.QgRcyuez0bcxlQFL2dxM96BsPv3fJH/LBKulC','admin');

# user_albums

INSERT INTO user_albums(album_id, user_id, rating, info)
VALUES (1,1,9,'fangjgnagjdgnajgneajg agaegnagnangag agaegnagjne');

INSERT INTO user_albums(album_id, user_id, rating, info)
VALUES (2,1,7,'fgsgsgangsggne');

INSERT INTO user_albums(album_id, user_id, rating, info)
VALUES (3,1,5,'gsgsgsgsggnagjne');

INSERT INTO user_albums(album_id, user_id, rating, info)
VALUES (4,1,2,'ajgneajg agaagaegnagjne');

INSERT INTO user_albums(album_id, user_id, rating, info)
VALUES (5,1,3,'sgsgsgsseg');

INSERT INTO user_albums(album_id, user_id, rating, info)
VALUES (6,1,3,'opissafjgagkg');











