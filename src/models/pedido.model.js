const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
    },
    nome_pessoa: String,
    idade_pessoa: { type: Number, default: 0 },
    med_a: { type: Number, default: 0 },
    med_b: { type: Number, default: 0 },
    med_c: { type: Number, default: 0 },
    med_d: { type: Number, default: 0 },
    med_e: { type: Number, default: 0 },
    med_f: { type: Number, default: 0 },
    produto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Produto',
    },
    entidade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Entidade',
    },
    aprovado_pedido: { type: Boolean, default: false },
    status_pedido: { type: String, default: 'Recebido' },
    enviado_pedido: { type: Boolean, default: false },
    data_envio: String,
    valor_envio: { type: Number, default: 0.0 },
  },
  {
    timestamps: true,
  }
);

const Pedido = mongoose.model('Pedidos', DataSchema);
module.exports = Pedido;
