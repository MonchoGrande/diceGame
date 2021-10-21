const db = require("../config/dbconexion");
const Juego = require("../models/juego");
const Jugador = require("../models/jugador");

// Jugar al juego de los dados
const juegoDados = () => {
  let dado1 = Math.floor(Math.random() * 6) + 1;
  let dado2 = Math.floor(Math.random() * 6) + 1;
  let dados = [dado1, dado2];
  return dados;
};

//Retorna ratios partidas ganadas de todos los jugadores
const ratioPartidasGanadas = async () => {
  let jugadores = await Jugador.find({});

  let jugadorRatio = [];

  for (let i = 0; i < jugadores.length; i++) {
    let victorias = await Juego.find({
      resultado: "Ganas",
      idJugador: jugadores[i]._id,
    }).countDocuments();
    let partidas = await Juego.find({
      idJugador: jugadores[i]._id,
    }).countDocuments();
    
    let ratio = ((victorias / partidas).toFixed(2) * 100).toFixed();
    if (ratio === 'NaN') {
      ratio = ' ';
    }
    let datos = {
      Id: jugadores[i]._id,
      Nombre: jugadores[i].nombre,
      Porcentaje: ratio ,
    };

    jugadorRatio.push(datos);
  }

  return jugadorRatio;
};

// Comrpobamos si existe un jugador mediante el ID
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

//Comprueba si existe un nombre
const checkJugadorNombre = (nombre) => {
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

// Obtenemos ranking
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

// Insertar el resultado de lanzar los dados
const insertPartida = async (idJugador) => {
  try {
    let dados = juegoDados();
    let resultado = dados[0] + dados[1] === 7 ? "Ganas" : "Pierdes";
    let juego = new Juego({
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

//Lista partidas de un jugador
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
