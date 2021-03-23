import React, { Component } from 'react';
import api from '../../services/api';
import '../../bootstrap.min.css';
import { Modal, Button, Table } from 'react-bootstrap';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endereco: '',
      cep: '',
      data: [],
      localidade: 'Cidade',
      uf: 'Estado',
      bairro: '',
      ibge: '',
      modalShow: false,
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleInfo = this.handleInfo.bind(this);
  }

  HandleSubmit = async (event) => {
    event.preventDefault();

    const response = await api.get('/' + this.state.endereco + '/json');
    this.setState({ data: response.data });

    //CONDICIONAL PARA IDENTIFICAR MAIS DE UM LOGRADOURO

    if (this.state.data.length > 1) {
      this.handleShow();
    } else {
      this.setState({
        endereco: this.state.data.map((info) => info.logradouro),
      });
      this.setState({ bairro: this.state.data.map((info) => info.bairro) });
      this.setState({ cep: this.state.data.map((info) => info.cep) });
      this.setState({ ibge: this.state.data.map((info) => info.ibge) });
    }
  };

  handleClose() {
    this.setState({
      modalShow: false,
    });
  }

  handleShow() {
    this.setState({
      modalShow: true,
    });
  }

  HandleChangeAdress(value) {
    this.setState({
      endereco: value,
    });
  }

  handleInfo(info) {
    console.log(info);
    this.handleClose();
    this.setState({ bairro: info.bairro });
    this.setState({ cep: info.cep });
    this.setState({ ibge: info.ibge });
    this.setState({ endereco: info.logradouro });
  }

  render() {
    return (
      <form className="form" onSubmit={this.HandleSubmit}>
        <h1>Consulta de endereço</h1>
        <p>Insira um endereço:</p>
        <input
          name="adress"
          type="text"
          placeholder="ENDEREÇO"
          value={this.state.endereco}
          onChange={(event) => this.HandleChangeAdress(event.target.value)}
        />
        <input
          name="city"
          type="text"
          placeholder="CIDADE"
          readOnly
          value={this.state.localidade}
        />
        <input
          name="state"
          type="text"
          placeholder="ESTADO"
          readOnly
          value={this.state.uf}
        />
        <input
          name="cep"
          type="text"
          placeholder="CEP"
          value={this.state.cep}
          onChange={(event) => this.HandleChange(event.target.value)}
        />
        <input
          name="bairro"
          type="text"
          placeholder="BAIRRO"
          value={this.state.bairro}
        />
        <input
          name="ibge"
          type="text"
          placeholder="IBGE"
          value={this.state.ibge}
        />
        <Modal show={this.state.modalShow}>
          <Modal.Header closeButton>
            <Modal.Title>Selecione Endereço</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Logradouro</th>
                  <th>Complemento</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((info) => (
                  <tr>
                    <td>{info.logradouro}</td>
                    <td>{info.complemento}</td>
                    <td>
                      <Button
                        onClick={() => this.handleInfo(info)}
                        type="submit"
                      >
                        OK
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
        <button type="submit" onClick={this.HandleSubmit}>
          Encontrar CEP
        </button>
      </form>
    );
  }
}
