const router = require('express').Router();
const controller = require('../controller/games');
const controllerJugador = require('../controller/players');

/* ROUTES */

//Create a player
router.post('/players', controllerJugador.insertJugador);

//Modify the player's name
router.put('/players', controllerJugador.actualizaNombre);

//A specific player makes a dice roll.
router.post('/players/:id/games', controller.tiradaDados);

//Eliminates the player's rolls
router.delete('/players/:id/games', controller.deletePartidas);

//Returns the list of all players in the system with their average success rate
router.get('/players', controller.player);

//Returns a player's list of plays.
router.get('/players/:id/games', controller.listaPartidas);

//Returns the average ranking of all players in the system.
router.get('/players/ranking', controller.allRanking);

//The player with the worst success rate returns.
router.get('/players/ranking/loser', controller.loser);

//The player with the best success rate returns.
router.get('/players/ranking/winner', controller.winner);

module.exports = router;
