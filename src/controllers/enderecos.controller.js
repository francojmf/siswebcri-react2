const Endereco = require('../models/endereco.model');

module.exports = {
  async index(req, res) {
    const endereco = await Endereco.find();
    res.json(endereco);
  },
  async create(req, res) {
    const {
      logradouro_endereco,
      numero_endereco,
      complemento_endereco,
      cep_endereco,
      cidade_endereco,
      estado_endereco,
    } = req.body;
    let data = {};
    let endereco = await Endereco.findOne({ logradouro_endereco });

    if (!endereco) {
      data = {
        logradouro_endereco,
        numero_endereco,
        complemento_endereco,
        cep_endereco,
        cidade_endereco,
        estado_endereco,
      };

      endereco = await Endereco.create(data);
      return res.status(200).json(endereco);
    } else {
      return res.status(500).json(endereco);
    }
  },
  async details(req, res) {
    const { _id } = req.params;
    const endereco = await Endereco.findOne({ _id });
    res.json(endereco);
  },
  async delete(req, res) {
    const { _id } = req.params;
    const endereco = await Endereco.findByIdAndDelete({ _id });
    return res.json(endereco);
  },
  async update(req, res) {
    const {
      _id,
      logradouro_endereco,
      numero_endereco,
      complemento_endereco,
      cep_endereco,
      cidade_endereco,
      estado_endereco,
    } = req.body;
    const data = {
      logradouro_endereco,
      numero_endereco,
      complemento_endereco,
      cep_endereco,
      cidade_endereco,
      estado_endereco,
    };
    const endereco = await Endereco.findOneAndUpdate({ _id }, data, {
      new: true,
    });
    res.json(endereco);
  },
};
