const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const jugadorSchema = Schema(
  {
    nombre: String,
  },
  { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);
jugadorSchema.plugin(autoIncrement.plugin, 'Jugador');
module.exports = mongoose.model('Jugador', jugadorSchema);
