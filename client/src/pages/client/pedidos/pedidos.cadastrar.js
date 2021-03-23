import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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

export default function PedidoCadastrar() {
  const classes = useStyles();
  const idUsuario = getIdUsuario();
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState('');
  const [pessoa, setPessoa] = useState('');
  const [idade, setIdade] = useState('');
  const [entidades, setEntidades] = useState('');
  const [entidadeId, setEntidadeId] = useState('');
  const [produtos, setProduto] = useState('');
  const [produtoId, setProdutoId] = useState('');
  const [medA, setMedA] = useState('');

  useEffect(() => {
    async function loadEntidades() {
      const response = await api.get('/api/entidades');
      setEntidades(response.data);
      setLoading(false);
    }
    loadEntidades();
  }, []);
  useEffect(() => {
    async function loadUsuario() {
      const response = await api.get('/api/usuarios.details/' + idUsuario);
      setUsuario(response.data.nome_usuario);
    }
    loadUsuario();
  }, []);
  useEffect(() => {
    async function loadProduto() {
      const response = await api.get('/api/produtos');
      setProduto(response.data);
    }
    loadProduto();
  }, []);
  /*
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
*/
  async function handleSubmit() {
    const data = {
      user: idUsuario,
      nome_pessoa: pessoa,
      idade_pessoa: idade,
      produto: produtoId,
      entidade: entidadeId,
      med_a: medA,
    };
    console.log(idUsuario);
    console.log(produtoId);
    console.log(entidadeId);

    if (pessoa !== '' && idade !== '' && medA !== '') {
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
                  {loading ? (
                    <LinearProgress
                      style={{ width: '50%', margin: '20px auto' }}
                    />
                  ) : (
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
                  <Grid item xs={12} sm={2}>
                    <TextField
                      type="name"
                      id="usuario"
                      name="usuario"
                      label={usuario}
                      placeholder={idUsuario}
                      multiline
                      //    variant="outlined"
                      onLoad={(e) => setUsuario(e.target.placeholder)}
                    />
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
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}
