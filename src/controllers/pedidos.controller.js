const Pedido = require('../models/pedido.model');
const Usuario = require('../models/usuario.model');
const usuario = Usuario.ObjectId;

module.exports = {
  async index(req, res) {
    const pedido = await Pedido.find().populate(usuario);
    res.json(pedido);
  },

  async create(req, res) {
    try {
      let pedido = await Pedido.create({ ...req.body, usuario });
      return res.send(pedido);
    } catch {
      return res.status(400).json(pedido);
    }
  },

  async details(req, res) {
    const { _id } = req.params;
    const pedido = await Pedido.findOne({ _id });
    res.json(pedido);
  },

  async delete(req, res) {
    const { _id } = req.params;
    const pedido = await Pedido.findByIdAndDelete({ _id });
    return res.json(pedido);
  },

  async update(req, res) {
    const data = req.body;
    const pedido = await Pedido.findOneAndUpdate({ _id }, data, {
      new: true,
    });
    res.json(pedido);
  },
};
