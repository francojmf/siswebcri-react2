const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema(
  {
    pedido: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Pedido',
    },
    nome_pessoa: String,
    idade_pessoa: { type: Number, default: 0 },
    med_a: { type: Number, default: 0 },
    med_b: { type: Number, default: 0 },
    med_c: { type: Number, default: 0 },
    med_d: { type: Number, default: 0 },
    med_e: { type: Number, default: 0 },
    med_f: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Pessoa = mongoose.model('Pessoas', DataSchema);
module.exports = Pessoa;
