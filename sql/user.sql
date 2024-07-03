DROP DATABASE kitchen;

CREATE DATABASE kitchen;
USE kitchen;

CREATE USER 'project'@'localhost' IDENTIFIED BY 'project';
GRANT ALL PRIVILEGES ON kitchen.* TO 'project'@'localhost' WITH GRANT OPTION;

use kitchen;

CREATE TABLE user(
username varchar(50) not null,
email varchar(254) not null,
password varchar(60) not null,
primary key (username),
unique (email)
);

