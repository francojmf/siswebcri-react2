const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Usuario',
    },
    atividade_colaborador: String,
    fone_colaborador: String,
  },
  {
    timestamps: true,
  }
);

const Entidade = mongoose.model('Entidades', DataSchema);
module.exports = Entidade;
