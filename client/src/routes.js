import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// IMPORTS ADMIN
import Dashboard from './pages/admin/dashboard';
import Produtos from './pages/admin/produtos';
import ProdutoEditar from './pages/admin/produtos/produtos.editar';
import ProdutoCadastrar from './pages/admin/produtos/produtos.cadastrar';
import Usuarios from './pages/admin/usuarios';
import UsuarioEditar from './pages/admin/usuarios/usuarios.editar';
import MeuUsuarioEditar from './pages/admin/usuarios/usuario.editar';
import UsuarioCadastrar from './pages/admin/usuarios/usuarios.cadastrar';
// IMPORTS CLIENT
import Home from './pages/client/home';
import ProdutoDetails from './pages/client/produtos/produtos.details';
import Login from './pages/admin/login';
import UsuarioNovo from './pages/admin/usuarios/usuario.novo';
import PrivateRoute from './services/wAuth';
import Entidades from './pages/client/entidades';
import EntidadeCadastrar from './pages/client/entidades/entidades.cadastrar';
import Pedidos from './pages/client/pedidos';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* Rota Client
        <PrivateRoute path="/usuario" exact component={Usuario} />
        */}
        <Route path="/" exact component={Home} />
        <Route path="/produtos/:idProduto" exact component={ProdutoDetails} />
        <Route path="/usuario/cadastrar" exact component={UsuarioNovo} />
        <Route path="/client/pedidos/" exact component={Pedidos} />
        <Route path="/client/entidades/" exact component={Entidades} />
        <PrivateRoute path="/usuario" exact component={Dashboard} />
        <PrivateRoute
          path="/usuario/editar/:idUsuario"
          exact
          component={UsuarioEditar}
        />

        <PrivateRoute
          path="/client/entidades/cadastrar"
          exact
          component={EntidadeCadastrar}
        />
        {/* Rota Admin */}
        <Route path="/" exact component={Home} />
        <Route path="/admin/login" exact component={Login} />
        <PrivateRoute path="/admin" exact component={Dashboard} />

        <PrivateRoute path="/admin/produtos" exact component={Produtos} />
        <PrivateRoute
          path="/admin/produtos/cadastrar"
          exact
          component={ProdutoCadastrar}
        />
        <PrivateRoute
          path="/admin/produtos/editar/:idProduto"
          exact
          component={ProdutoEditar}
        />

        <PrivateRoute path="/admin/usuarios" exact component={Usuarios} />
        <PrivateRoute
          path="/admin/usuarios/cadastrar"
          exact
          component={UsuarioCadastrar}
        />
        <PrivateRoute
          path="/admin/usuarios/editar/:idUsuario"
          exact
          component={UsuarioEditar}
        />
        <PrivateRoute
          path="/admin/usuario/editar/:idUsuario"
          exact
          component={MeuUsuarioEditar}
        />
      </Switch>
    </BrowserRouter>
  );
}
