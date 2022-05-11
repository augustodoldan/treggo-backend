# Challenge Treggo (backend)

Es el backend de una aplicación de "Star Wars", en la cual el/la visitante va a poder tener acceso a los diferentes planetas, personajes y películas; del fantástico mundo creado por el cineasta estadounidense George Lucas.
Los datos se reciben desde la API (SWAPI : https://swapi.tech/) mediante "axios" y se envían al frontend (hecho en react).
Se almacena en MongoDb la información del usuario de forma segura utilizando bcrypt.

## Tecnologías
El proyecto fue creado con:
* "node.js" versión: 16.14.2
* "express.js" versión: "4.16.1"
* "axios" versión: "0.27.2"
* "bcryptjs" versión: "2.4.3"
* "cors" versión: "2.8.5"
* "mongodb" versión: "4.5.0"
* "bcryptjs" versión: "2.4.3"
* "passport-jwt" versión: "4.0.0"

## Instalación

Para instalar todas las dependencias del proyecto, correr en la consola: 

```bash
npm install
```

## Para correr la aplicación en Windows: 
```bash
cd ruta del proyecto
```
## opcionalmente se puede instalar nodemon
```bash
 npm install nodemon -g
```
## Agregar un archivo .env con las variables de entorno.
## Y finalmente:
```bash
 npm start
```
o, si instaló nodemon:
```bash
 nodemon nombre-del-archivo.js
```
## Observación:
El proyecto aún continúo desarrollándolo e implementándole mas funcionalidades. Cualquier bug o sugerencia, por favor avisarme que será de gran ayuda para mí. 