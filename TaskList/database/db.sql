-- create `tasksdb` database
CREATE DATABASE IF NOT EXISTS 'tasksdb';

USE tasksdb;

-- table `tasks`
CREATE TABLE tasks (
    id INTEGER AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(300),
    done BOOLEAN NOT NULL DEFAULT 0,
    createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

-- test inserts in `tasks`
INSERT INTO tasks(title, description, done) VALUES 
    ('Tarea 1', 'Descripción de Tarea 1', 0),
    ('Tarea 2', 'Descripción de Tarea 2', 1),
    ('Tarea 3', 'Descripción de Tarea 3', 1); 