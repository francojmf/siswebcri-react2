const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema(
  {
    nome_produto: String,
    descricao_produto: String,
    tipo_produto: String,
    qtd_produto: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Produto = mongoose.model('Produtos', DataSchema);
module.exports = Produto;
