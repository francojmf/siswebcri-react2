const Entidade = require('../models/entidade.model');

module.exports = {
  async index(req, res) {
    const entidade = await Entidade.find();
    res.json(entidade);
  },
  async create(req, res) {
    const {
      nome_entidade,
      descricao_entidade,
      tipo_entidade,
      qtd_entidade,
    } = req.body;
    let data = {};
    let entidade = await Entidade.findOne({ nome_entidade });

    if (!entidade) {
      data = { nome_entidade, descricao_entidade, tipo_entidade, qtd_entidade };

      entidade = await Entidade.create(data);
      return res.status(200).json(entidade);
    } else {
      return res.status(500).json(entidade);
    }
  },
  async details(req, res) {
    const { _id } = req.params;
    const entidade = await Entidade.findOne({ _id });
    res.json(entidade);
  },
  async delete(req, res) {
    const { _id } = req.params;
    const entidade = await Entidade.findByIdAndDelete({ _id });
    return res.json(entidade);
  },
  async update(req, res) {
    const {
      _id,
      nome_entidade,
      descricao_entidade,
      tipo_entidade,
      qtd_entidade,
    } = req.body;
    const data = {
      nome_entidade,
      descricao_entidade,
      tipo_entidade,
      qtd_entidade,
    };
    const entidade = await Entidade.findOneAndUpdate({ _id }, data, {
      new: true,
    });
    res.json(entidade);
  },
};
