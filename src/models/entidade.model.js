const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Usuario',
    },
    nome_entidade: String,
    cpf_cnpj: String,
    fone_entidade: String,
  },
  {
    timestamps: true,
  }
);

const Entidade = mongoose.model('Entidades', DataSchema);
module.exports = Entidade;
