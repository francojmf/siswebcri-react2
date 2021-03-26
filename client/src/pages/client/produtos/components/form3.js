import React from 'react';
//import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
//import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';

import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
//import SaveIcon from '@material-ui/icons/Save';
//import api from '../../../services/api';
import { useStyles } from '../../../../functions/use_styles';
//import styles from '../styles.module.css';
//import Form2 from './form2';

function Form3() {
  const classes = useStyles();

  const [cidade, setCidade] = React.useState('Bauru');
  // const [estado, setEstado] = React.useState('');
  const [uf, setUf] = React.useState('SP');
  const [listUf, setListUf] = React.useState([]);
  // const [city, setCity] = React.useState('');
  const [listCity, setListCity] = React.useState([]);
  const dados = listUf;
  const dados2 = listCity;
  const city = cidade;
  const uf2 = uf;

  console.log(uf2);
  // console.log(estado);
  console.log(city);

  function loadUf() {
    let url = 'https://servicodados.ibge.gov.br/';
    url = url + 'api/v1/localidades/estados';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => a.nome.localeCompare(b.nome));
        setListUf([...data]);
      });
  }

  function loadCity(id) {
    let url = 'https://servicodados.ibge.gov.br/api/v1/';
    url = url + `localidades/estados/${id}/municipios`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => a.nome.localeCompare(b.nome));
        setListCity([...data]);
      });
  }

  React.useEffect(() => {
    loadUf();
  }, []);
  React.useEffect(() => {
    if (uf) {
      loadCity(uf);
    }
  }, [uf]);

  return (
    <div className={classes.root}>
      <div className={classes.appBarSpacer} style={{ marginBottom: 10 }} />
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <Grid container spacing={12}>
            <Grid item xs={12} sm={6}>
              <label> Estado : </label>
              <Select
                value={uf}
                //  onClick={(e) => setEstado(e.target.key)}
                onChange={(e) => setUf(e.target.value)}
              >
                {listUf.map((a, b) => (
                  <option key={a.id} value={a.sigla}>
                    {a.sigla} - {a.nome}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label> Cidade : </label>
              <Select
                height="50px"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              >
                {listCity.map((a, b) => (
                  <option value={a.nome}>{a.nome}</option>
                ))}
              </Select>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Form3;

/*
  async function handleSubmit() {
   const data = {
    cidade: cidade,
  estado: estado,
   };

    if (
      cidade !== '' &&
      estado !== ''
    ) {
      const response = await api.post('/api/entidades', data);
      if (response.status === 200) {
        window.location.href = '/client/pedidos';
      } else {
        alert('Erro ao cadastrar a entidade!');
      }
    } else {
      alert('Por favor, preencha todos os dados!');
    }
  }
  }


<Grid item xs={12} sm={6}>
        <Form2
          data={dados}
          label="sigla"
          value="id"
          extraInfo="nome"
          name="sigla"
          className="anyClass"
          placeholder="Estado"
          onClick={(e) => setEstado(e.target.name)}
          onChange={(e) => setEstado(e.target.value)}
        />
                    </Grid>
            <Grid item xs={12} sm={6}>
                <Form2
                  data={dados2}
                  label="nome"
                  value="id"
                  extraInfo="sigla"
                  name="nome"
                  className="anyClass"
                  placeholder="Município"
                  onClick={() => console.log('entering')}
                  onChange={() => console.log('leaving')}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        className={classes.btnSuccess}
                      >
                        <SaveIcon /> Salvar
                      </Button>
                    </Grid>


                            <Grid item xs={12} sm={6}>
              <label> Estado : </label>
              <Select value={uf} onChange={(e) => setUf(e.target.value)}>
                {listUf.map((a, b) => (
                  <option name={a.sigla} value={a.id}>
                    {a.sigla} - {a.nome}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label> Cidade : </label>
              <Select
                height="50px"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              >
                {listCity.map((a, b) => (
                  <option value={a.nome}>{a.nome}</option>
                ))}
              </Select>
            </Grid>
*/
