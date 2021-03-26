import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuUsuario from '../../../components/menu-usuario';
import Footer from '../../../components/footer-admin';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import api from '../../../services/api';
import { useStyles } from '../../../functions/use_styles';
import { getIdUsuario } from '../../../../src/services/auth';
import LinearProgress from '@material-ui/core/LinearProgress';
import ImgMedidas from '../../../assets/img/medidas2.jpg';

export default function PedidoCadastrar() {
  const classes = useStyles();
  const idUsuario = getIdUsuario();
  const [loading, setLoading] = useState(true);
  // const [usuario, setUsuario] = useState('');
  const [pessoa, setPessoa] = useState('');
  const [idade, setIdade] = useState('');
  const [entidades, setEntidades] = React.useState([]);
  const [entidadeId, setEntidadeId] = React.useState('');

  const [cidade, setCidade] = React.useState('');
  const [estado, setEstado] = React.useState('SP');
  const [uf, setUf] = React.useState('SP');
  const [listUf, setListUf] = React.useState([]);

  const [medA, setMedA] = useState('');
  const [medB, setMedB] = useState('');
  const [medC, setMedC] = useState('');
  const [medD, setMedD] = useState('');
  const [medE, setMedE] = useState('');
  const [medF, setMedF] = useState('');

  const [produtos, setProdutos] = useState([]);
  const [produtoId, setProdutoId] = React.useState('');

  useEffect(() => {
    async function loadProdutos() {
      const response = await api.get('/api/produtos');
      setProdutos(response.data);
      // setLoading(false);
    }
    loadProdutos();
  }, []);

  function loadEntidades() {
    const response = api.get('/api/entidades');
    setEntidades(response.data);
    //  setLoading(false);
  }
  // function loadEntidades() {
  //   let url = '/api/entidades';
  //   const response = api.get(url);
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       data.sort((a, b) => a.nome.localeCompare(b.nome));
  //       setEntidades([...data]);
  //     });
  // }

  React.useEffect(() => {
    loadEntidades();
  }, []);

  console.log(entidades);
  console.log(produtos);

  async function handleSubmit() {
    const data = {
      user: idUsuario,
      nome_pessoa: pessoa,
      idade_pessoa: idade,
      produto: produtoId,
      entidade: entidadeId,
      med_a: medA,
      med_b: medB,
      med_c: medC,
      med_d: medD,
      med_e: medE,
      med_f: medF,
    };
    console.log(idUsuario);
    console.log(produtoId);
    console.log(entidadeId);

    if (
      pessoa !== '' &&
      idade !== '' &&
      medA !== '' &&
      medB !== '' &&
      medC !== '' &&
      medD !== '' &&
      medE !== '' &&
      medF !== ''
    ) {
      const response = await api.post('/api/pedidos', data);
      if (response.status === 200) {
        window.location.href = '/client/pedidos';
      } else {
        alert('Erro ao cadastrar o pedido!');
      }
    } else {
      alert('Por favor, preencha todos os dados!');
    }
  }

  return (
    <>
      <div className={classes.root}>
        <MenuUsuario title={'Sis Web CRI - Novo Pedido'} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} style={{ marginBottom: 30 }} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <Paper className={classes.paper}>
                  <h2>Novo Pedido</h2>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        type="name"
                        required
                        id="pessoa"
                        name="pessoa"
                        label="Nome completo da criança"
                        fullWidth
                        autoComplete="pessoa"
                        value={pessoa}
                        onChange={(e) => setPessoa(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        type="number"
                        required
                        id="idade"
                        name="idade"
                        label="Idade da Criança"
                        fullWidth
                        autoComplete="idade"
                        value={idade}
                        onChange={(e) => setIdade(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <label> Selecione CRI : </label>

                      <Select
                        height="50px"
                        value={produtos}
                        onChange={(e) => setProdutoId(e.target.value)}
                      >
                        {produtos.map((item) => (
                          <option
                            key={item._id}
                            name={item.nome}
                            value={item.id}
                          >
                            {item.nome}}
                          </option>
                        ))}
                      </Select>
                    </Grid>

                    {/* <Grid item xs={12} sm={3}>
                    <label> Selecione Entidade : </label>
                    <Select
                      value={entidades}
                      // onChange={(e) => setEstado(e.target.name)}
                      onChange={(e) => setEntidadeId(e.target.value)}
                    >
                      {entidades
                        .filter((item) => item.user === idUsuario)
                        .map((item) => (
                          <option name={item.nome} value={item.id}>
                            {item.nome}
                          </option>
                        ))}
                    </Select>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <label> Selecione CRI : </label>
                    <Select
                      height="50px"
                      value={produtos}
                      onChange={(e) => setProdutoId(e.target.value)}
                    >
                      {produtos.map((item) => (
                        <option name={item.nome} value={item.id}>
                          {item.nome}}
                        </option>
                      ))}
                    </Select>
                  </Grid> */}
                    <Grid item xs={12} sm={2}>
                      <TextField
                        required
                        id="medA"
                        name="medA"
                        label="Medida A (cm)"
                        fullWidth
                        autoComplete="medA"
                        value={medA}
                        onChange={(e) => setMedA(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        required
                        id="medB"
                        name="medB"
                        label="Medida B (cm)"
                        fullWidth
                        autoComplete="medB"
                        value={medB}
                        onChange={(e) => setMedB(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        required
                        id="medC"
                        name="medC"
                        label="Medida C (cm)"
                        fullWidth
                        autoComplete="medC"
                        value={medC}
                        onChange={(e) => setMedC(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        required
                        id="medD"
                        name="medD"
                        label="Medida D (cm)"
                        fullWidth
                        autoComplete="medD"
                        value={medD}
                        onChange={(e) => setMedD(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        required
                        id="medE"
                        name="medE"
                        label="Medida E (cm)"
                        fullWidth
                        autoComplete="medE"
                        value={medE}
                        onChange={(e) => setMedE(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        required
                        id="medF"
                        name="medF"
                        label="Medida F (cm)"
                        fullWidth
                        autoComplete="medF"
                        value={medF}
                        onChange={(e) => setMedF(e.target.value)}
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
                      <Button
                        style={{ marginBottom: 30 }}
                        variant="contained"
                        color="success"
                        href={'/client/pedidos'}
                      >
                        <ArrowBackIcon /> Voltar
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <div>
                <p>- Faça as medidas de acordo com a imagem abaixo.</p>
                <img src={ImgMedidas} />
              </div>
            </Grid>
            <Box pt={4}>
              <Footer />
            </Box>
          </Container>
        </main>
      </div>
    </>
  );
}

/*
                  {loading ? (
                    <LinearProgress
                      style={{ width: '50%', margin: '20px auto' }}
                    />
                  ) : (
                    <Grid item xs={12} sm={3}>
                      <label> Selecione Entidade : </label>
                      <Select
                        value={entidades}
                        // onChange={(e) => setEstado(e.target.name)}
                        onChange={(e) => setEntidadeId(e.target.value)}
                      >
                        {entidades
                          .filter((item) => item.user === idUsuario)
                          .map((item) => (
                            <option name={item.nome} value={item.id}>
                              {item.nome}
                            </option>
                          ))}
                      </Select>
                    </Grid>
                  )}
                  {loading ? (
                    <LinearProgress
                      style={{ width: '50%', margin: '20px auto' }}
                    />
                  ) : (
                    <Grid item xs={12} sm={3}>
                      <label> Selecione CRI : </label>
                      <Select
                        height="50px"
                        value={produtos}
                        onChange={(e) => setProdutoId(e.target.value)}
                      >
                        {produtos.map((item) => (
                          <option name={item.nome} value={item.id}>
                            {item.nome}}
                          </option>
                        ))}
                      </Select>
                    </Grid>
                  )}

  useEffect(() => {
    async function loadProdutoId() {
      const response = await api.get('/api/produtos');
      setProdutoId(
        response.data.map((produtos) => {
          return produtos._id;
        })
      );
    }
    loadProdutoId();
  }, []);

                      <Grid item xs={12} sm={2}>
                      {entidades
                        .filter((item) => item.user === idUsuario)
                        .map((item) => (
                          <TextField
                            key={item._id}
                            type="name"
                            id="entidadeId"
                            name="Entidade"
                            label={item.nome_entidade}
                            placeholder={item._id}
                            multiline
                            //    variant="outlined"
                            onLoad={(e) => setEntidadeId(e.target.placeholder)}
                          />
                        ))}
                    </Grid>
                  )}
                  {loading ? (
                    <LinearProgress
                      style={{ width: '50%', margin: '20px auto' }}
                    />
                  ) : (
                    <Grid item xs={12} sm={2}>
                      {produtos.map((item) => (
                        <TextField
                          key={item._id}
                          type="name"
                          id="produtoId"
                          name="Produto"
                          label={item.nome_produto}
                          placeholder={item._id}
                          multiline
                          //    variant="outlined"
                          onLoad={(e) => setProdutoId(e.target.placeholder)}
                        />
                      ))}
                    </Grid>
                  )}
*/
