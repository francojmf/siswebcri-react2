const Entidade = require('../models/entidade.model');
const Usuario = require('../models/usuario.model');
const usuario = Usuario.ObjectId;

module.exports = {
  async index(req, res) {
    const entidade = await Entidade.find().populate(usuario);
    res.json(entidade);
  },

  async create(req, res) {
    try {
      let entidade = await Entidade.create({ ...req.body, usuario });
      return res.send(entidade);
    } catch {
      return res.status(400).json(entidade);
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
      cpf_cnpj,
      fone_entidade,
      logradouro,
      numero,
      complemento,
      bairro,
      cep,
      cidade,
      estado,
      user,
    } = req.body;
    const data = {
      nome_entidade,
      cpf_cnpj,
      fone_entidade,
      logradouro,
      numero,
      complemento,
      bairro,
      cep,
      cidade,
      estado,
      user,
    };
    const entidade = await Entidade.findOneAndUpdate({ _id }, data, {
      new: true,
    });
    res.json(entidade);
  },
};
