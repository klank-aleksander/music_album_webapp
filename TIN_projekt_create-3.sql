-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2025-01-06 13:43:52.165

-- tables
-- Table: album
CREATE TABLE album (
    id int  NOT NULL AUTO_INCREMENT,
    name varchar(50)  NOT NULL,
    release_date date  NOT NULL,
    picture_link varchar(2048)  NULL,
    CONSTRAINT album_pk PRIMARY KEY (id)
);

-- Table: album_artist
CREATE TABLE album_artist (
    artist_id int  NOT NULL,
    album_id int  NOT NULL,
    CONSTRAINT album_artist_pk PRIMARY KEY (artist_id,album_id)
);

-- Table: album_genre
CREATE TABLE album_genre (
    genre_id int  NOT NULL,
    album_id int  NOT NULL,
    CONSTRAINT album_genre_pk PRIMARY KEY (genre_id,album_id)
);

-- Table: artist
CREATE TABLE artist (
    id int  NOT NULL AUTO_INCREMENT,
    name varchar(50)  NOT NULL,
    country_id int  NULL,
    CONSTRAINT artist_pk PRIMARY KEY (id)
);

-- Table: country
CREATE TABLE country (
    id int  NOT NULL AUTO_INCREMENT,
    name varchar(50)  NOT NULL,
    CONSTRAINT country_pk PRIMARY KEY (id)
);

-- Table: genre
CREATE TABLE genre (
    id int  NOT NULL AUTO_INCREMENT,
    name varchar(50)  NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
);

-- Table: top_albums
CREATE TABLE top_albums (
    album_id int  NOT NULL,
    CONSTRAINT top_albums_pk PRIMARY KEY (album_id)
);

-- Table: user
CREATE TABLE user (
    id int  NOT NULL AUTO_INCREMENT,
    email varchar(50)  NOT NULL UNIQUE,
    password nvarchar(256)  NOT NULL,
    role varchar(50)  NOT NULL,
    CONSTRAINT user_pk PRIMARY KEY (id)
);

-- Table: user_albums
CREATE TABLE user_albums (
    id int  NOT NULL AUTO_INCREMENT,
    album_id int  NOT NULL,
    user_id int  NOT NULL,
    rating int  NULL,
    info varchar(500)  NULL,
    CONSTRAINT user_albums_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: AlbumArtist_album (table: album_artist)
ALTER TABLE album_artist ADD CONSTRAINT AlbumArtist_album FOREIGN KEY AlbumArtist_album (album_id)
    REFERENCES album (id);

-- Reference: AlbumArtist_artist (table: album_artist)
ALTER TABLE album_artist ADD CONSTRAINT AlbumArtist_artist FOREIGN KEY AlbumArtist_artist (artist_id)
    REFERENCES artist (id);

-- Reference: album_genre_album (table: album_genre)
ALTER TABLE album_genre ADD CONSTRAINT album_genre_album FOREIGN KEY album_genre_album (album_id)
    REFERENCES album (id);

-- Reference: album_genre_genre (table: album_genre)
ALTER TABLE album_genre ADD CONSTRAINT album_genre_genre FOREIGN KEY album_genre_genre (genre_id)
    REFERENCES genre (id);

-- Reference: artist_country (table: artist)
ALTER TABLE artist ADD CONSTRAINT artist_country FOREIGN KEY artist_country (country_id)
    REFERENCES country (id);

-- Reference: top_albums_album (table: top_albums)
ALTER TABLE top_albums ADD CONSTRAINT top_albums_album FOREIGN KEY top_albums_album (album_id)
    REFERENCES album (id);

-- Reference: user_album_album (table: user_albums)
ALTER TABLE user_albums ADD CONSTRAINT user_album_album FOREIGN KEY user_album_album (album_id)
    REFERENCES album (id);

-- Reference: user_album_user (table: user_albums)
ALTER TABLE user_albums ADD CONSTRAINT user_album_user FOREIGN KEY user_album_user (user_id)
    REFERENCES user (id);

-- End of file.

