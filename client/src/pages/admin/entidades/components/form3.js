import React from 'react';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import { useStyles } from '../../../../functions/use_styles';

function Form3() {
  const classes = useStyles();

  const [cidade, setCidade] = React.useState('');
  const [estado, setEstado] = React.useState('');
  const [listUf, setListUf] = React.useState([]);
  const [listCity, setListCity] = React.useState([]);

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
    if (estado) {
      loadCity(estado);
    }
  }, [estado]);

  return (
    <div className={classes.root}>
      <div className={classes.appBarSpacer} style={{ marginBottom: 10 }} />
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <Grid container spacing={12}>
            <Grid item xs={12} sm={6}>
              <label> Estado : </label>
              <Select
                value={estado}
                //  onClick={(e) => setEstado(e.target.key)}
                onChange={(e) => setEstado(e.target.value)}
              >
                {listUf.map((a, b) => (
                  <option key={a.id} value={a.sigla}>
                    {a.sigla}
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
                  <option key={a.id} value={a.nome}>
                    {a.nome}
                  </option>
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

*/
