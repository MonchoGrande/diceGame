# Node_Rest_Juedo_de_Dados
Exercicies sprint 4 Dice Game of the IT Academy course
Itinerary Nodejs

# Credentials
The project is structured as follows, in the main branch is the readme with the instructions and 3 branches that are mysql, mongo, jwt.
Each branch fulfills the requirements of the exercise.

# Initializa database
# MySql
Go to the mysql branch, in the scripts folder you will find the database.sql file.

You will find them in the config folder in the dbkeys.js file.

# MongoDB
Open a terminal and navigate  to the project folder<br>
-`mongod`(start mongob daemon, mongodb starts listening)<br>

You will find them in the config folder in the dbconexion.js file.

Exercise jwt has been performed with connection to mongodb

# Running the server 
Leave the previous terminal running and open a new one.<br>
-`npm install`(install all node dependencies)<br>
-`npm start` (start the app)<br>

# Endpoints 
URL’s:
- POST: /login : genera un token 
- POST: /players : crea un jugador
- PUT /players : modifica el nom del jugador
- POST /players/{id}/games/ : un jugador específic realitza una tirada dels daus.
- DELETE /players/{id}/games: elimina les tirades del jugador
- GET /players/: retorna el llistat de tots els jugadors del sistema amb el seu   percentatge mig d’èxits
- GET /players/{id}/games: retorna el llistat de jugades per un jugador.
- GET /players/ranking: retorna el ranking mig de tots els jugadors del sistema. És a dir, el percentatge mig d’èxits.
- GET /players/ranking/loser: retorna el jugador amb pitjor percentatge d’èxit
- GET /players/ranking/winner: retorna el jugador amb pitjor percentatge d’èxit

## Extra

To create users you must go to Postman, select the POST path http://localhost:3000/players body, x-www-form-urlencoded
key: name, value: whatever you want.

To modify the name you must go to the following PUT path http://localhost:3000/players 
body, x-www-form-urlencoded
key: id, value: must be an existing id
key: name, value: the name must match the id

JWT
To create a token you must go to the following path 
POST http://localhost:3000/login 
body, x-www-form-urlencoded
key: name, value: the name must not exist in the Mongo database
key: psw, value: whatever you like
This process will validate your login and generate a token, copy that token and go to Headers.
key: authorization, value: Bearer leave a space and enter the token.
You are now authorized to use all the routes

