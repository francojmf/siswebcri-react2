const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Usuario',
    },
    atividade: String,
    fone_colaborador: String,
  },
  {
    timestamps: true,
  }
);

const Colaborador = mongoose.model('Colaboradores', DataSchema);
module.exports = Colaborador;
