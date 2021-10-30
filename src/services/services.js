const db = require('../config/dbconexion');
const Juego = require('../models/juego');
const Jugador = require('../models/jugador');

//Playing the dice game
const juegoDados = () => {
  const dado1 = Math.floor(Math.random() * 6) + 1;
  const dado2 = Math.floor(Math.random() * 6) + 1;
  const dados = [dado1, dado2];
  return dados;
};

//Return ratios of won games of all players
const ratioPartidasGanadas = async () => {
  try {
    const jugadores = await Jugador.find({});

    const jugadorRatio = [];

    for (let i = 0; i < jugadores.length; i++) {
      const victorias = await Juego.find({
        resultado: 'Ganas',
        idJugador: jugadores[i]._id,
      }).countDocuments();
      const partidas = await Juego.find({
        idJugador: jugadores[i]._id,
      }).countDocuments();

      let ratio = ((victorias / partidas).toFixed(2) * 100).toFixed();
      if (ratio === 'NaN') {
        ratio = ' ';
      }
      const datos = {
        Id: jugadores[i]._id,
        Nombre: jugadores[i].nombre,
        Porcentaje: ratio,
      };

      jugadorRatio.push(datos);
    }

    return jugadorRatio;
  } catch (err) {
    return err;
  }
};

// We check if a player exists by means of the player ID
const checkPlayerId = (id) => {
  return new Promise((resolve, reject) => {
    Jugador.countDocuments({ _id: id }, (err, count) => {
      if (!err) {
        if (count !== 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      } else {
        reject(err);
      }
    });
  });
};

//Checks if a name exists
const checkJugadorNombre = async (nombre) => {
  try {
    return new Promise((resolve, reject) => {
      Jugador.countDocuments({ nombre }, (err, count) => {
        if (count === 0) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  } catch (err) {
    return err;
  }
};

// We obtain ranking
const allRanking = async () => {
  try {
    ratio = await ratioPartidasGanadas();

    ranking = ratio.sort(function (a, b) {
      return b.Porcentaje.toLowerCase().localeCompare(
        a.Porcentaje.toLowerCase()
      );
    });
    return ranking;
  } catch (err) {
    return err;
  }
};

// Insert the result of rolling the dice
const insertPartida = async (idJugador) => {
  try {
    const dados = juegoDados();
    const resultado = dados[0] + dados[1] === 7 ? 'Ganas' : 'Pierdes';
    const juego = new Juego({
      resultado,
      dado1: dados[0],
      dado2: dados[1],
      idJugador,
    });
    return await juego.save();
  } catch (err) {
    return err;
  }
};

//List of single-player games
const recuperaPartidas = (id) => {
  return new Promise((resolve, reject) => {
    Juego.find({ idJugador: id }, (err, partidas) => {
      if (err) {
        reject(err);
      }
      if (partidas) {
        resolve({ partidas });
      } else {
        reject(err);
      }
    });
  });
};

module.exports = {
  ratioPartidasGanadas,
  checkPlayerId,
  checkJugadorNombre,
  juegoDados,
  insertPartida,
  recuperaPartidas,
  allRanking,
};
