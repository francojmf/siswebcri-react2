import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import api from '../../../services/api';
import AddIcon from '@material-ui/icons/Add';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: { display: 'flex' },
  title: { flexGrow: 1 },
  appBarSpacer: theme.mixins.toolbar,
  content: { flexGrow: 1, height: '100vh', overflow: 'auto' },
  container: { paddingTop: theme.spacing(2), paddingBottom: theme.spacing(10) },
  paper: {
    padding: 35,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  formControl: { width: '100%' },
  btnSuccess: {
    backgroundColor: 'green',
    color: '#fff',
    '&:hover': { backgroundColor: '#12b912' },
  },
}));

export default function ProdutoEditar() {
  const classes = useStyles();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState('');
  const [qtd, setQtd] = useState('');

  const { idProduto } = useParams();

  useEffect(() => {
    async function getProduto() {
      var response = await api.get('/api/produtos.details/' + idProduto);
      setNome(response.data.nome_produto);
      setDescricao(response.data.descricao_produto);
      setTipo(response.data.tipo_produto);
      setQtd(response.data.qtd_produto);
    }
    getProduto();
  }, []);

  async function handleSubmit() {
    const data = {
      nome_produto: nome,
      descricao_produto: descricao,
      tipo_produto: tipo,
      qtd_produto: qtd,
      _id: idProduto,
    };

    if (nome !== '' && descricao !== '' && tipo !== '' && qtd !== '') {
      const response = await api.post('/api/produtos', data);

      if (response.status === 200) {
        window.location.href = '/admin/produtos';
      } else {
        alert('Erro ao atualizar o produto!');
      }
    } else {
      alert('Por favor, preencha todos os dados!');
    }
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'Sis Web CRI - PRODUTOS'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} style={{ marginBottom: 30 }} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button
                style={{ marginBottom: 30 }}
                variant="contained"
                color="success"
                href={'/admin/produtos'}
              >
                <ArrowBackIcon /> Voltar
              </Button>
              <Button
                style={{ marginBottom: 10 }}
                variant="contained"
                color="primary"
                href={'/admin/produtosos/cadastrar'}
              >
                <AddIcon />
                Cadastrar
              </Button>
              <Paper className={classes.paper}>
                <h2>Atualização de Produtos</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="nome"
                      name="nome"
                      label="Nome do Produto"
                      fullWidth
                      autoComplete="nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="descricao"
                      name="descricao"
                      label="Descrição do produto"
                      fullWidth
                      autoComplete="nome"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="name"
                      required
                      id="tipo"
                      name="tipo"
                      label="Tipo"
                      fullWidth
                      autoComplete="tipo"
                      value={tipo}
                      onChange={(e) => setTipo(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="number"
                      required
                      id="qtd"
                      name="qtd"
                      label="Quantidade"
                      fullWidth
                      autoComplete="qtd"
                      value={qtd}
                      onChange={(e) => setQtd(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      className={classes.btnSuccess}
                    >
                      <SaveIcon /> Salvar
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
