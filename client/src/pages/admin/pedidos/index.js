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
import { withStyles } from '@material-ui/core/styles';
import api from '../../../services/api';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';
import { useStyles } from '../../../functions/use_styles';

export default function PedidosListagem() {
  const classes = useStyles();

  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [entidades, setEntidades] = useState('');

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  useEffect(() => {
    async function loadPedidos() {
      const response = await api.get('/api/pedidos');
      setPedidos(response.data);
      const response2 = await api.get('/api/entidades');
      setEntidades(response2.data);
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
      <MenuAdmin title={'Sis Web CRI - PEDIDOS'} />
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
                              <StyledTableCell>Entidade</StyledTableCell>
                              <StyledTableCell align="center">
                                CPF ou CNPJ
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Endereço
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Cidade
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                CEP
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                Opções
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {entidades.map((item) => (
                              <TableRow key={item._id}>
                                <TableCell component="th" scope="row">
                                  {item.nome_entidade}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  {item.cpf_cnpj}
                                </TableCell>
                                <TableCell align="center">
                                  {item.logradouro}, {item.numero} -
                                  {item.complemento}
                                </TableCell>
                                <TableCell align="center">
                                  {item.cidade} - {item.estado}
                                </TableCell>
                                <TableCell align="center">{item.cep}</TableCell>
                                <TableCell align="right">
                                  <ButtonGroup aria-label="outlined success button group">
                                    <Button
                                      variant="contained"
                                      style={{ color: 'green' }}
                                      href={
                                        '/client/entidades/editar/' + item._id
                                      }
                                    >
                                      <AutorenewIcon /> Atualizar
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
                        Para fazer um pedido é preciso "Cadastrar Entidade" com
                        o endereço de entrega, caso ainda não tenha feito isto.
                      </p>
                      <Button
                        style={({ marginBottom: 10 }, { marginLeft: 10 })}
                        variant="contained"
                        color="success"
                        href={'/admin/entidades/cadastrar'}
                      >
                        <AddIcon />
                        Cadastrar Entidade
                      </Button>
                      <Button
                        style={({ marginBottom: 10 }, { marginLeft: 10 })}
                        variant="contained"
                        color="success"
                        href={'/admin/pedidos/cadastrar'}
                      >
                        <AddIcon />
                        Iniciar Pedido
                      </Button>
                      <p></p>
                    </div>

                    <TableContainer component={Paper}>
                      {loading ? (
                        <LinearProgress
                          style={{ width: '50%', margin: '20px auto' }}
                        />
                      ) : (
                        <Table
                          className={classes.table}
                          size="small"
                          aria-label="a dense table"
                        >
                          <TableHead>
                            <TableRow>
                              <StyledTableCell>Pedido</StyledTableCell>
                              <StyledTableCell align="center">
                                Criança
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Idade
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Aprovado
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Enviado
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                Opções
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {pedidos.map((item) => (
                              <TableRow key={item._id}>
                                <TableCell component="th" scope="row">
                                  {item._id.substr(20, 4)}
                                </TableCell>
                                <TableCell align="center">
                                  {item.nome_pessoa}
                                </TableCell>
                                <TableCell align="center">
                                  {item.idade_pessoa}
                                </TableCell>
                                <TableCell align="center">
                                  {item.aprovado_pedido ? (
                                    <i
                                      className="fas fa-check"
                                      style={{ color: 'green' }}
                                    ></i>
                                  ) : (
                                    <i
                                      className="fas fa-times"
                                      style={{ color: 'red' }}
                                    ></i>
                                  )}
                                </TableCell>
                                <TableCell align="center">
                                  {item.enviado_pedido ? (
                                    <i
                                      className="fas fa-check"
                                      style={{ color: 'green' }}
                                    ></i>
                                  ) : (
                                    <i
                                      className="fas fa-times"
                                      style={{ color: 'red' }}
                                    ></i>
                                  )}
                                </TableCell>
                                <TableCell align="right">
                                  <ButtonGroup aria-label="outlined success button group">
                                    <Button
                                      variant="contained"
                                      style={{ color: 'green' }}
                                      href={
                                        '/client/pedidos/editar/' + item._id
                                      }
                                    >
                                      <AutorenewIcon /> Atualizar
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
                        Para fazer um pedido é necessário informar alguns dados
                        da criaça que receberá a doação.
                      </p>
                      <p>
                        Para iniciar um novo pedido clique em "Iniciar Pedido".
                      </p>
                      <p></p>
                    </div>
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
