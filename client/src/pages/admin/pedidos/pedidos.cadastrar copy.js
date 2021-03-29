import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import api from '../../../services/api';
import { useStyles } from '../../../functions/use_styles';
import { getIdUsuario } from '../../../../src/services/auth';
import ImgMedidas from '../../../assets/img/medidas2.jpg';

export default function PedidoCadastrar() {
  const classes = useStyles();
  const idUsuario = getIdUsuario();
  // const [usuario, setUsuario] = useState('');
  const [pessoa, setPessoa] = useState('');
  const [idade, setIdade] = useState('');
  const [medA, setMedA] = useState('');
  const [medB, setMedB] = useState('');
  const [medC, setMedC] = useState('');
  const [medD, setMedD] = useState('');
  const [medE, setMedE] = useState('');
  const [medF, setMedF] = useState('');

  const [produtos, setProdutos] = React.useState([]);
  const [produtoId, setProdutoId] = React.useState('');
  // const [prodNome, setProdNome] = useState('');
  const [entidades, setEntidades] = React.useState([]);
  const [entidadeId, setEntidadeId] = React.useState('');
  // const [entiNome, setEntiNome] = useState('');

  function loadProdutos() {
    const response = api.get('/api/produtos');
    produtos = response.data.json();
    setProdutos(response.data);
  }

  function loadEntidades() {
    const response = api.get('/api/entidades');
    setEntidades(response.data);
  }

  React.useEffect(() => {
    loadProdutos();
  }, []);
  console.log(produtos);

  React.useEffect(() => {
    loadEntidades();
  }, []);
  console.log(entidades);

  const handleChange2 = (event) => {
    setProdutoId(event.target.value);
  };
  // const handleChange3 = (event) => {
  //   setProdNome(event.target.name);
  // };
  // function renderEntidadeItem() {
  //   return entidades.map((item, i) => (
  //     <MenuItem key={item._id} value={item._id} name={item.nome_entidade}>
  //       {item.nome_entidade}
  //     </MenuItem>
  //   ));
  // }

  const handleChange = (event) => {
    setEntidadeId(event.target.value);
  };

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
        alert('Pedido cadastrado com sucesso !!');
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
        <MenuAdmin title={'Sis Web CRI - Novo Pedido'} />
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
                    {/* <Grid item xs={12} sm={3}>
                      <label> Selecione CRI: </label>
                      <Select value={produtos} onChange={handleChange2}>
                        {produtos.map((a, b) => (
                          <option name={a.nome_produto} value={a._id}>
                            {a.nome_produto}
                          </option>
                        ))}
                      </Select>
                    </Grid> */}

                    {/* <Grid item xs={12} sm={3}>
                      <label> Selecione CRI : </label>
                      <Select
                        value={produtos}
                        onChange={(e) => setProdutos(e.target.name)}
                        onChange={(e) => setProdutoId(e.target.value)}
                      >
                        {produtos.map((a, b) => (
                          <option name={a.nome_produto} value={a.id}>
                            {a.nome_produto}
                          </option>
                        ))}
                      </Select>
                    </Grid> */}
                    <Grid item xs={12} sm={3}>
                      <FormControl>
                        <InputLabel>Selecione Entidade</InputLabel>
                        <Select
                          value={entidades}
                          onChange={handleChange}
                          style={{ width: '150px' }}
                          renderValue={(selected) => {
                            if (selected.length !== 0) {
                              return <em>Selecionada</em>;
                            }
                            return <em>Selecione</em>;
                          }}
                          inputProps={{
                            name: 'entidade',
                            id: '_id',
                          }}
                        >
                          {/* {renderEntidadeItem()} */}
                        </Select>
                      </FormControl>
                    </Grid>
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
  function loadProdutos() {
    //  const response = api.get('/api/produtos');
    let url = 'localhost:5000/api/produtos';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => a.nome_produto.localeCompare(b.nome_produto));
        setProdutos([...data]);
      });
  }
*/
