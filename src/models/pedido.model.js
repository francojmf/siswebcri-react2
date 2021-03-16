const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema(
  {
    produto: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Produto',
    },
    entidade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Entidade',
    },
    endereco: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Endereco',
    },
    aprovado_pedido: Boolean,
    qtd_pedido: { type: Number, default: 1 },
    status_pedido: String,
    enviado_pedido: Boolean,
    data_envio: String,
    valor_envio: { type: Number, default: 0.0 },
  },
  {
    timestamps: true,
  }
);

const Pedido = mongoose.model('Pedidos', DataSchema);
module.exports = Pedido;
