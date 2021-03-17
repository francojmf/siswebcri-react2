import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddIcon from '@material-ui/icons/Add';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ClearIcon from '@material-ui/icons/Clear';
import api from '../../../services/api';
import MenuUsuario from '../../../components/menu-usuario';
import Footer from '../../../components/footer-admin';
import { useStyles } from '../../../functions/use_styles';

export default function PedidosListagem() {
  const classes = useStyles();

  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPedidos() {
      const response = await api.get('/api/pedidos');
      setPedidos(response.data);
      setLoading(false);
    }
    loadPedidos();
  }, []);

  async function handleDelete(id) {
    if (window.confirm('Deseja realmente excluir este pedido?')) {
      var result = await api.delete('client/pedidos/' + id);
      if (result.status === 200) {
        window.location.href = '/client/pedidos';
      } else {
        alert('Ocorreu um erro. Por favor, tente novamente!');
      }
    }
  }

  return (
    <div className={classes.root}>
      <MenuUsuario title={'Sis Web CRI - Meus Pedidos'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Listagem de Pedidos</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      {loading ? (
                        <LinearProgress
                          style={{ width: '50%', margin: '20px auto' }}
                        />
                      ) : (
                        <Table
                          className={classes.table}
                          aria-label="simple table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>Produto</TableCell>
                              <TableCell align="center">Entidade</TableCell>
                              <TableCell align="center">Endereco</TableCell>
                              <TableCell align="center">
                                Qtd Disponível
                              </TableCell>
                              <TableCell align="center">
                                Data de Cadastro
                              </TableCell>
                              <TableCell align="right">Opções</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {pedidos.map((row) => (
                              <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                  {row.produto}
                                </TableCell>
                                <TableCell align="center">
                                  {row.entidade}
                                </TableCell>
                                <TableCell align="center">
                                  {row.logradouro}
                                </TableCell>
                                <TableCell align="center">
                                  {row.qtd_pedido}
                                </TableCell>
                                <TableCell align="center">
                                  {new Date(row.createdAt).toLocaleString(
                                    'pt-br'
                                  )}
                                </TableCell>
                                <TableCell align="right">
                                  <ButtonGroup aria-label="outlined success button group">
                                    <Button
                                      variant="contained"
                                      style={{ color: 'green' }}
                                      href={'/client/pedidos/editar/' + row._id}
                                    >
                                      <AutorenewIcon /> Atualizar
                                    </Button>
                                    <Button
                                      variant="contained"
                                      color="secondary"
                                      onClick={() => handleDelete(row._id)}
                                    >
                                      <ClearIcon />
                                    </Button>
                                  </ButtonGroup>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </TableContainer>
                    <div>
                      <p>
                        Para fazer um pedido é preciso "Cadastrar Entidade".
                      </p>
                      <p>
                        Para iniciar um novo pedido clique em "Iniciar Pedido".
                      </p>
                    </div>
                  </Grid>
                  <Button
                    style={({ marginBottom: 10 }, { marginLeft: 10 })}
                    variant="contained"
                    color="success"
                    href={'/client/entidades/cadastrar'}
                  >
                    <AddIcon />
                    Cadastrar Entidade
                  </Button>
                  <Button
                    style={({ marginBottom: 10 }, { marginLeft: 10 })}
                    variant="contained"
                    color="success"
                    href={'/client/entidades/cadastrar'}
                  >
                    <AddIcon />
                    Iniciar Pedido
                  </Button>
                  <Button
                    style={({ marginBottom: 10 }, { marginLeft: 10 })}
                    variant="contained"
                    color="success"
                    href={'/client/pedidos/cadastrar'}
                  >
                    <AddIcon />
                    Cadastrar Criança
                  </Button>
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
