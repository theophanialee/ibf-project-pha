DROP DATABASE kitchen_household;

CREATE DATABASE kitchen_household;

USE kitchen_household;

CREATE TABLE users (
    user_id VARCHAR(8) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(254) NOT NULL,
    password VARCHAR(60) NOT NULL,
    last_edited TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id),
    UNIQUE (email)
);

CREATE TABLE household (
    household_id VARCHAR(8) NOT NULL,
    description VARCHAR(50) NOT NULL,
    last_edited TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (household_id)
);

CREATE TABLE household_members (
    record_id VARCHAR(8) NOT NULL,
    user_id VARCHAR(8) NOT NULL,
    household_id VARCHAR(8) NOT NULL,
    PRIMARY KEY (record_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (household_id) REFERENCES household(household_id)
);

CREATE TABLE listing (
    listing_id INT NOT NULL AUTO_INCREMENT,
    household_id VARCHAR(8) NOT NULL,
    posted_by VARCHAR(8) NOT NULL,
    label VARCHAR(300) NOT NULL,
    image VARCHAR(300) NOT NULL,
    brand VARCHAR(300) NOT NULL,
    servingSize INT NOT NULL,
    servings INT NOT NULL,
    expiry DATE NOT NULL,
    last_edited TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (listing_id),
    FOREIGN KEY (household_id) REFERENCES household(household_id),
    FOREIGN KEY (posted_by) REFERENCES users(user_id)
);