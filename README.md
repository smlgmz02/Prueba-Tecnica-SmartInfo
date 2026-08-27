# Gestor de Contactos (PHP + React) 

Aplicación web para registrar, consultar y eliminar contactos. El proyecto está dividido en un backend REST desarrollado en PHP y un frontend desarrollado con React y Vite bajo una arquitectura MVC.

## Tecnologías y versiones

- **PHP:** 8.0 o superior, con las extensiones `PDO`.
- **Node.js:** 20 o superior.
- **npm:** incluido con Node.js.
- **MySQL:** 8.0 o superior. También es compatible con MariaDB 10.4 o superior.
- **React:** 19.2.8.
- **Vite:** 8.2.2.

Las versiones de React y Vite corresponden a las dependencias declaradas en `frontend/package.json`. PHP, Node.js y MySQL deben estar instalados en el equipo para ejecutar el proyecto localmente.

## Requisitos previos

1. Instalar [XAMPP](https://www.apachefriends.org/) o disponer de un servidor Apache con PHP y MySQL.
2. Instalar [Node.js](https://nodejs.org/) 20 o superior.
3. Verificar que Apache y MySQL estén iniciados desde el panel de XAMPP.
4. Clonar o descargar este repositorio dentro de la carpeta pública de Apache. En XAMPP para Windows, la ubicación recomendada es:

	```text
	C:\xampp\htdocs\proyecto_tecnico
	```

## Configuración de la base de datos

La conexión está configurada en `backend/config/Conexion.php` con estos valores locales:

```text
Servidor: localhost
Base de datos: GestorContactos
Usuario: root
Contraseña: vacía
Motor: MySQL
```

### Crear la base de datos con el script SQL

1. Abrir [phpMyAdmin](http://localhost/phpmyadmin/) o un cliente MySQL.
2. Seleccionar la opción **Importar**.
3. Elegir el archivo `database.sql` ubicado en la raíz del proyecto.
4. Ejecutar la importación.

El script crea la base de datos `GestorContactos`, crea la tabla `Contactos` e inserta dos registros de prueba.

También puede ejecutarse desde la consola de MySQL:

```bash
mysql -u root -p < database.sql
```

Si el usuario `root` no tiene contraseña, presionar `Enter` cuando la consola la solicite. Si la instalación utiliza otros datos de acceso, actualizar las propiedades `$host`, `$bd_nombre`, `$username` y `$password` en `backend/config/Conexion.php`.

## Levantar el backend

El backend no requiere instalar dependencias adicionales. Apache debe servir la carpeta del proyecto desde `htdocs`.

Con XAMPP iniciado, comprobar que esta dirección responda:

```text
http://localhost/proyecto_tecnico/backend/controllers/C_Contacto.php
```

La URL anterior corresponde al endpoint principal de contactos. El backend admite:

- `GET`: listar contactos.
- `POST`: crear un contacto.
- `DELETE`: eliminar un contacto mediante `id_contacto`.

## Levantar el frontend

Abrir una terminal en la carpeta `frontend` y ejecutar:

```bash
cd frontend
npm install
npm run dev
```

Vite mostrará la dirección local, normalmente:

```text
http://localhost:5173
```

Abrir esa dirección en el navegador. El frontend ya está configurado para consumir el backend en:

```text
http://localhost/proyecto_tecnico/backend/controllers/C_Contacto.php
```

## Comandos disponibles del frontend

Desde la carpeta `frontend`:

```bash
npm run dev      # inicia el servidor de desarrollo
npm run build    # genera la versión de producción
npm run preview  # previsualiza la compilación de producción
npm run lint     # revisa el código con ESLint
```

## Estructura principal

```text
proyecto_tecnico/
├── backend/
│   ├── config/Conexion.php
│   ├── controllers/C_Contacto.php
│   ├── models/M_Contacto.php
│   └── views/
├── frontend/
│   ├── src/components/
│   ├── src/services/contactoService.js
│   └── package.json
├── database.sql
└── README.md
```

## Solución de problemas comunes

- **Error de conexión a la base de datos:** confirmar que MySQL esté iniciado y que los datos de `backend/config/Conexion.php` coincidan con la instalación local.
- **Error 404 en el endpoint:** confirmar que la carpeta del proyecto esté dentro de `C:\xampp\htdocs` y que Apache esté iniciado.
- **El frontend no puede cargar contactos:** abrir primero el endpoint del backend en el navegador y verificar que la base de datos haya sido importada.
