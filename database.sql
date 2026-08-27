-- SCRIPT DE LA BASE DE DATOS -- 

CREATE DATABASE GestorContactos;
USE GestorContactos;

CREATE TABLE IF NOT EXISTS Contactos(
    id_contacto INT AUTO_INCREMENT PRIMARY KEY, /* Se añade un ID autoincremental para mantener la consistencia de los registros en caso de realizar consultas */
    nombre_completo VARCHAR(255) NOT NULL,
    correo_electronico VARCHAR(150) NOT NULL,
    telefono_contacto VARCHAR(20) NOT NULL -- Tipo varchar porque sigue siendo una cadena de caracteres con los que no se puede operar.
);

-- INSERCIONES (DATOS DE PRUEBA) --

INSERT INTO Contactos (nombre_completo, correo_electronico, telefono_contacto) VALUES
    ('Samuel Gomez', 'samuelgomez@gmail.com', '3152297732'),
    ('Lucia Rodriguez', 'luciarodriguez@gmail.com', '3205257732');