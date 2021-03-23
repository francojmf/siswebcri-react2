import React from 'react';
import ApiCep from '../produtos/ApiCep';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class BuscaCEP extends React.Component {
  constructor() {
    super();

    this.state = {
      logradouro: 'Rua...',
      bairro: 'Bairro...',
      cidade: 'Cidade...',
      estado: 'Estado',
    };
  }

  handleDados(e) {
    const cep = e.target.value;
    ApiCep.SearchCep(cep).then((res) => {
      let logradouro = res.data.logradouro;
      let bairro = res.data.bairro;
      let cidade = res.data.localidade;
      let estado = res.data.uf;
      this.setState({
        logradouro: logradouro,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
      });
    });
  }

  render() {
    return (
      <div>
        <div>
          <button
            style={{ marginBottom: 30 }}
            variant="contained"
            color="success"
            href={'/client/entidades/cadastrar'}
          >
            <ArrowBackIcon /> Voltar
          </button>
        </div>
        <form className="container box is-3">
          <label className="label">Cep</label>
          <p className="control">
            <input
              type="text"
              className="input is-6"
              onBlur={this.handleDados.bind(this)}
              required="true"
              placeholder="Cep..."
            />
          </p>

          <label className="label">Endereço</label>
          <p className="control">
            <input
              type="text"
              className="input is-6"
              value={this.state.logradouro}
              disabled
            />
          </p>

          <label className="label">Número</label>
          <p className="control">
            <input type="number" className="input is-6" />
          </p>

          <label className="label">Bairro</label>
          <p className="control">
            <input
              type="text"
              className="input is-6"
              value={this.state.bairro}
              disabled
            />
          </p>

          <label className="label">Cidade</label>
          <p className="control">
            <input
              type="text"
              className="input is-6"
              value={this.state.cidade}
              disabled
            />
          </p>

          <label className="label">UF</label>
          <p className="control">
            <input
              type="text"
              className="input is-6"
              value={this.state.estado}
              disabled
            />
          </p>
        </form>
      </div>
    );
  }
}

export default BuscaCEP;
