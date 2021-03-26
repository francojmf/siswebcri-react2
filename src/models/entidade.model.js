const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
    },
    nome_entidade: String,
    cpf_cnpj: String,
    fone_entidade: String,
    logradouro: String,
    numero: Number,
    complemento: String,
    bairro: String,
    cep: String,
    cidade: String,
    estado: String,
  },
  {
    timestamps: true,
  }
);

const Entidade = mongoose.model('Entidades', DataSchema);
module.exports = Entidade;
