const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Usuario',
    },
    logradouro_endereco: String,
    numero_endereco: Number,
    complemento_endereco: String,
    cep_endereco: String,
    cidade_endereco: String,
    estado_endereco: String,
  },
  {
    timestamps: true,
  }
);

const Endereco = mongoose.model('Enderecos', DataSchema);
module.exports = Endereco;
