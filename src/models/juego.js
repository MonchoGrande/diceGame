const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const juegoSchema = Schema({
  dado1: { type: Number, required: true },
  dado2: { type: Number, required: true },
  resultado: { type: String, required: true },
  idJugador: { type: String, required: true },
});

module.exports = mongoose.model('Juego', juegoSchema);
