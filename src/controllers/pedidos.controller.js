const Pedido = require('../models/pedido.model');
const Produto = require('../models/produto.model');

module.exports = {
  async index(req, res) {
    const pedido = await Pedido.find();
    res.json(pedido);
  },
  async create(req, res) {
    const { produto, entidade, endereco, qtd_pedido } = req.body;
    let data = {};
    let pedido = await Pedido.findOne({ produto });
    if (!pedido) {
      data = { produto, entidade, endereco, qtd_pedido };
      pedido = await pedido.create(data);
      return res.status(200).json(pedido);
    } else {
      return res.status(500).json(pedido);
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
    const { _id, produto, entidade, endereco, qtd_pedido } = req.body;
    const data = { produto, entidade, endereco, qtd_pedido };
    const pedido = await Pedido.findOneAndUpdate({ _id }, data, {
      new: true,
    });
    res.json(pedido);
  },
};
