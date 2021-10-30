const Jugador = require('../models/jugador.js');

//Insert Players
const insertJugador = async (req, res, next) => {
  let jugador = new Jugador();

  if (req.body.nombre === '') {
    jugador.nombre = 'ANONIMO';
    jugador.save((err, jugadorSave) => {
      if (err) return next(new Error(err));
      res.status(200).send({ jugador: jugadorSave });
    });
  } else {
    Jugador.countDocuments({ nombre: req.body.nombre }, (err, count) => {
      if (count === 0) {
        jugador.nombre = req.body.nombre;
        jugador.save((err, jugadorSave) => {
          if (err) return next(new Error(err));
          res.status(201).json({ jugador: jugadorSave });
        });
      } else {
        res.status(200).json({
          message: `El jugador '${req.body.nombre}' ya existe.`,
        });
      }
    });
  }
};

//Update name
const actualizaNombre = async (req, res) => {
  const { body = {} } = req;

  const jugador = new Jugador();
  if (!body.id) {
    res.status(200).send({ message: 'Debe introducir un id' });
  } else if (
    Jugador.countDocuments({ nombre: body.nombre }, (err, count) => {
      if (count === 0) {
        Jugador.findByIdAndUpdate(body.id, body, (err, jugadorUpdate) => {
          if (err) return next(new Error(err));

          jugador.save(jugadorUpdate);
          res.status(200).send({
            message: `El nuevo nombre del id: ${jugadorUpdate.id} es ${body.nombre}`,
          });
        });
      } else {
        res.status(200).json({
          message: `El nombre:${body.nombre} ya existe, introduzca otro.`,
        });
      }
    })
  );
};

module.exports = { insertJugador, actualizaNombre };
