const servicio = require('../services/services');
const Juego = require('../models/juego');

//We played a game
const tiradaDados = async (req, res,next) => {
  try {
    const id = { _id: req.params.id };
    const check = await servicio.checkPlayerId(id);

    if (check === true) {
      juego = await servicio.insertPartida(id);

      res.status(200).json({
        message: 'Resultado',
        Dado_1: juego.dado1,
        Dado_2: juego.dado2,
       Resultado: juego.resultado 
    })
      
    } else {
      res.status(404).send({ message: `El jugador introducido no existe` });
    }
  } catch (err) {
    return next(new Error(err));
  }
};

//We delete all the games of a player by his or her id
const deletePartidas = async (req, res) => {
  try {
    let id = req.params.id;

    let resultado = await Juego.deleteMany({ idJugador: id });
    if (resultado.deletedCount === 0)
      res.status(400).send(`Este id no tiene partidas o no existe`);

    res.status(200).send({
      message: `Borradas todas las partidas del jugador:  ${id}`,
    });
  } catch (err) {
    return next(new Error(err))
    
  }
};

//Returns all players and won games ratio
const player = async (req, res, next) => {
  try {
    let jugadoresRatio = await servicio.ratioPartidasGanadas();

    res.json({
      'Jugadores y sus porcentajes': jugadoresRatio,
    });
  } catch (err) {
    return next(new Error(err));
  }
};

//Lists the games of a specific player
const listaPartidas = async (req, res, next) => {
  try {
    let id = req.params.id;
    let existe = await servicio.checkPlayerId(id);
    if (existe === true) {
      const resultado = await servicio.recuperaPartidas(id);
      res.status(200).json(resultado);
    } else {
      res.status(404).json({
        message: 'El jugador introducido no exite',
      });
    }
  } catch (err) {
    return next(new Error(err));
  }
};
//Returns the ranking of all players
const allRanking = async (req, res, next) => {
  try {
    const results = await servicio.allRanking();
    res.status(200).json(results);
  } catch (err) {
    return next(new Error(err));
  }
};
//Returns the best of the ranking 
const winner = async (req, res, next) => {
  try {
    const resultado = await servicio.allRanking();
    res.status(200).send(resultado[0]);
  } catch (err) {
    return next(new Error(err));
  }
};
//Returns the worst ranked player who has played at least one game
const loser = async (req, res, next) => {
  try {
    const resultado = await servicio.allRanking();
    res.status(200).send(resultado[resultado.length - 1]);
  } catch (err) {
    return next(new Error(err));
  }
};

module.exports = {
  player,
  deletePartidas,
  tiradaDados,
  listaPartidas,
  allRanking,
  winner,
  loser,
};
