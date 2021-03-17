const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema(
  {
    produto: {
      type: mongoose.Schema.Types.ObjectId,
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
    aprovado_pedido: { type: Boolean, default: false },
    qtd_pedido: Number,
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
