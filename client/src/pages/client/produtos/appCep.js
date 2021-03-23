import React, { Component, useState } from 'react';
import api from './api';
import TextField from '@material-ui/core/TextField';

class AppCep extends Component {
  constructor(props) {
    super(props);
    this.state = { cep: '', endereco: {} };
  }
  pesquisarCep = (e) => {
    e.preventDefault();
    api
      .get(this.state.cep + '/json')
      .then((data) => this.setState({ endereco: data.data }));
  };

  salvaCep = (e) => {
    console.log('foi digitado');
    this.setState({ cep: e.target.value });
  };

  render() {
    const { endereco } = this.state;

    return (
      <div className="App">
        <form>
          <input
            type="text"
            value={this.state.cep}
            onChange={this.salvaCep}
          ></input>
          <button onClick={this.pesquisarCep}>Pesquisar</button>
        </form>
        <div>
          <ul>
            <li>Cep: {endereco.cep}</li>
            <li>Logradouro: {endereco.logradouro}</li>
            <li>Complemento: {endereco.complemento}</li>
            <li>Bairro: {endereco.bairro}</li>
            <li>Cidade: {endereco.localidade}</li>
            <li>Estado: {endereco.uf}</li>
            <li>Ibge: {endereco.ibge}</li>
            <li>Gia: {endereco.gia}</li>
            <li>DDD: {endereco.ddd}</li>
            <li>Siafi: {endereco.siafi}</li>
          </ul>
        </div>
        <div></div>
      </div>
    );
  }
}

export default AppCep;
