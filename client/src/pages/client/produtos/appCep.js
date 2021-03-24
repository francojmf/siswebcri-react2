import './App.css';
import React from 'react';
import Form from './components/form';
import MenuLogin from '../../../components/menu-login';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
//import Modal from './components/modal/modal';

function App() {
  return (
    <div className="App">
      <MenuLogin title={'Sis Web CRI - Consulta CEP'} />
      <div className="container">
        <Button
          style={{ marginBottom: 10 }}
          variant="contained"
          color="success"
          href={'/client/entidades/cadastrar'}
        >
          <ArrowBackIcon />
          Voltar
        </Button>
        <Form></Form>
      </div>
    </div>
  );
}

export default App;
