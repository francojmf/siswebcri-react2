import React, { Component } from 'react';
import apiCep from './apiCep';
import { Modal, Button, Table } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import '../bootstrap.min.css';
import Form3 from './form3';
import styles from '../styles.module.css';
//import apiUf from './apiUf';

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
      // ibge: '',
      modalShow: false,
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleInfo = this.handleInfo.bind(this);
  }

  HandleSubmit = async (event) => {
    event.preventDefault();
    const response = await apiCep.get('/' + this.state.endereco + '/json');
    this.setState({ data: response.data });
    //this.setListUf({ data: uf2.data });

    //CONDICIONAL PARA IDENTIFICAR MAIS DE UM LOGRADOURO (MODAL)
    if (this.state.data.length > 1) {
      this.handleShow();
    } else {
      this.setState({
        endereco: this.state.data.map((info) => info.logradouro),
      });
      this.setState({ bairro: this.state.data.map((info) => info.bairro) });
      this.setState({ cep: this.state.data.map((info) => info.cep) });
      //  this.setState({ ibge: this.state.data.map((info) => info.ibge) });
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
    this.handleClose();
    this.setState({ bairro: info.bairro });
    this.setState({ cep: info.cep });
    // this.setState({ ibge: info.ibge });
    this.setState({ endereco: info.logradouro });
    this.setState({ localidade: info.localidade });
    this.setState({ uf: info.uf });
    console.log(info);
  }

  render() {
    return (
      <Grid container spacing={3}>
        <form className="form" onSubmit={this.HandleSubmit}>
          <p></p>
          <h4>Consulta de CEP pelo endereço</h4>
          <p></p>
          <div className={styles.fsInputContainer}>
            <Grid item xs={12} sm={12}>
              <div>
                <h5>Selecione um Estado e Município:</h5>
                <Form3></Form3>
              </div>
            </Grid>
            <p></p>
          </div>
          <h5>Insira um Logradouro (ou parte do nome):</h5>
          <div className={styles.fsInputContainer}>
            <Grid item xs={12} sm={12}>
              Logradouro -
              <input
                name="adress"
                type="text"
                placeholder="ENDEREÇO"
                value={this.state.endereco}
                onChange={(event) =>
                  this.HandleChangeAdress(event.target.value)
                }
              />
              <button
                type="submit"
                onClick={this.HandleSubmit}
                className={styles.buttom}
              >
                Encontrar CEP
              </button>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Grid item xs={12} sm={12}>
                Cidade -
                <input
                  name="cidade"
                  type="text"
                  placeholder="CIDADE"
                  value={this.state.localidade}
                />
                Estado -
                <input
                  name="estado"
                  type="text"
                  placeholder="ESTADO"
                  value={this.state.uf}
                />
                CEP -
                <input
                  name="cep"
                  type="text"
                  placeholder="CEP"
                  value={this.state.cep}
                  onChange={(event) => this.HandleChange(event.target.value)}
                />
                Bairro -
                <input
                  name="bairro"
                  type="text"
                  placeholder="BAIRRO"
                  value={this.state.bairro}
                />
              </Grid>
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
            </Grid>
          </div>

          <p></p>
        </form>
      </Grid>
    );
  }
}

/*

                <option key={this.state.id} value={this.state.sigla}></option>
              Estado -
              <select name="estado">
                {estados.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nome}
                  </option>
                ))}
                ;
              </select>
*/
/*
      uf2: '',
      listUf: [],
      
    const uf2 = await loadUf();
    const [listUf, setListUf] = React.useState([]);
    console.log(uf2);

    function loadUf() {
      let url = 'https://servicodados.ibge.gov.br/';
      url = url + 'api/v1/localidades/estados';
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          data.sort((a, b) => a.nome.localeCompare(b.nome));
          setListUf([...data]);
          //    this.setListUf({
          //     listUf: this.state.data.map((data) => data.estados),
          //   });
        });
    }

              <select
                value={this.state.uf}
                //    onChange={(e) => setEstado(e.target.name)}
                onChange={(e) => this.setUf(e.target.value)}
              >
                 listUf.map((a, b) => (
                  <option value={this.state.uf}>{this.state.uf2}</option>
                      ))
                </select>
*/
