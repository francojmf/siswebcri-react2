import React, { useState } from 'react';
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
import { useStyles } from '../../../functions/use-styles';

export default function PedidoCadastrar() {
  const classes = useStyles();

  const [produto, setProduto] = useState('');
  const [entidade, setEntidade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [qtd, setQtd] = useState('');

  async function handleSubmit() {
    const data = {
      produto: produto,
      entidade: entidade,
      endereco: endereco,
      qtd_pedido: qtd,
    };

    if (produto !== '' && entidade !== '' && endereco !== '' && qtd !== '') {
      const response = await api.post('/api/pedidos', data);

      if (response.status === 200) {
        window.location.href = '/admin/pedidos';
      } else {
        alert('Erro ao cadastrar o pedido!');
      }
    } else {
      alert('Por favor, preencha todos os dados!');
    }
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'Sis Web CRI - PEDIDOS'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} style={{ marginBottom: 30 }} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button
                style={{ marginBottom: 30 }}
                variant="contained"
                color="success"
                href={'/admin/pedidos'}
              >
                <ArrowBackIcon /> Voltar
              </Button>
              <Paper className={classes.paper}>
                <h2>Cadastro de Pedidos</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      type="name"
                      required
                      id="produto"
                      name="produto"
                      label="Produto"
                      fullWidth
                      autoComplete="produto"
                      value={produto}
                      onChange={(e) => setProduto(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="name"
                      required
                      id="entidade"
                      name="entidade"
                      label="Descrição do pedido"
                      fullWidth
                      autoComplete="nome"
                      value={entidade}
                      onChange={(e) => setEntidade(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="name"
                      required
                      id="endereco"
                      name="endereco"
                      label="endereco"
                      fullWidth
                      autoComplete="endereco"
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
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
