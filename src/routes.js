const express = require('express');
const routes = express.Router();
const Usuario = require('./controllers/usuarios.controller');
const Produto = require('./controllers/produtos.controller');
const Pedido = require('./controllers/pedidos.controller');
const Entidade = require('./controllers/entidades.controller');
routes.get('/', Produto.index);
// Rotas de Usuários
routes.post('/api/usuarios', Usuario.create);
routes.get('/api/usuarios', Usuario.index);
routes.get('/api/usuarios.details/:_id', Usuario.details);
routes.delete('/api/usuarios/:_id', Usuario.delete);
routes.put('/api/usuarios', Usuario.update);
routes.post('/api/usuarios/login', Usuario.login);
routes.get('/api/usuarios/checktoken', Usuario.checkToken);
routes.get('/api/usuarios/destroytoken', Usuario.destroyToken);
// Rotas de Produtos
routes.post('/api/produtos', Produto.create);
routes.get('/api/produtos', Produto.index);
routes.get('/api/produtos.details/:_id', Produto.details);
routes.delete('/api/produtos/:_id', Produto.delete);
routes.put('/api/produtos', Produto.update);
// Rotas de Pedidos
routes.post('/api/pedidos', Pedido.create);
routes.get('/api/pedidos', Pedido.index);
routes.get('/api/pedidos.details/:_id', Pedido.details);
routes.delete('/api/pedidos/:_id', Pedido.delete);
routes.put('/api/pedidos', Pedido.update);
// Rotas de Entidades
routes.post('/api/entidades', Entidade.create);
routes.get('/api/entidades', Entidade.index);
routes.get('/api/entidades.details/:_id', Entidade.details);
routes.delete('/api/entidades/:_id', Entidade.delete);
routes.put('/api/entidades', Entidade.update);

module.exports = routes;
