const servicio = require('../services/services');
const Juego = require('../models/juego');

//Jugamos una partida
const tiradaDados = async (req, res) => {
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
  } catch (error) {
    res
      .status(500)
      .send({ message: `Se ha producido un error en el servidor ` });
  }
};

//Eliminamos todas las partidas de un jugador por su id
const deletePartidas = async (req, res) => {
  try {
    let id = req.params.id;

    let resultado = await Juego.deleteMany({ idJugador: id });
    if (resultado.deletedCount === 0)
      res.status(400).send(`Este id no tiene partidas o no  existe`);

    res.status(200).send({
      message: `Borradas todas las partidas del jugador:  ${id}`,
    });
  } catch (error) {
    res.status(400).send({ message: `Se ha producido un error` });
  }
};

//Devuelve todos los jugadores y ratio partidas ganadas
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

// Lista las partidas de un jugador concreto
const listaPartidas = async (req, res) => {
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
};
//Devuelve el ranking de todos los jugadores
const allRanking = async (req, res) => {
  try {
    const results = await servicio.allRanking();
    res.status(200).json(results);
  } catch (e) {
    res
      .status(500)
      .send({ message: `Se ha producido un error en el servidor  ` });
  }
};
//Devuelve el mejor del ranking
const winner = async (req, res) => {
  try {
    const resultado = await servicio.allRanking();
    res.status(200).send(resultado[0]);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};
//Devuelve el peor del ranking que haya jugado al menos una partida
const loser = async (req, res) => {
  try {
    const resultado = await servicio.allRanking();
    res.status(200).send(resultado[resultado.length - 1]);
  } catch (e) {
    res.status(500).json({ message: e });
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
