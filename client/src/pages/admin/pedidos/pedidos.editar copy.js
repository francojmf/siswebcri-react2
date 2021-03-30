import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
import { useStyles } from '../../../functions/use_styles';
//import { Form } from 'react-bootstrap';

export default function PedidosEditar() {
  const classes = useStyles();
  const [user, setUser] = useState('');
  const [produto, setProduto] = useState('');
  const [entidade, setEntidade] = useState('');
  const [pessoa, setPessoa] = useState('');
  const [idade, setIdade] = useState('');
  const [medA, setMedA] = useState('');
  const [medB, setMedB] = useState('');
  const [medC, setMedC] = useState('');
  const [medD, setMedD] = useState('');
  const [medE, setMedE] = useState('');
  const [medF, setMedF] = useState('');
  const [createdAt, setCreate] = useState('');
  const [updatedAt, setUpdate] = useState('');
  const [aprovado, setAprovado] = useState(false);
  const { idPedido } = useParams();

  useEffect(() => {
    async function getPedido() {
      var response = await api.get('/api/pedidos.details/' + idPedido);
      setUser(response.data.user);
      setProduto(response.data.produto);
      setEntidade(response.data.entidade);
      setPessoa(response.data.nome_pessoa);
      setIdade(response.data.idade_pessoa);
      setMedA(response.data.med_a);
      setMedB(response.data.med_b);
      setMedC(response.data.med_c);
      setMedD(response.data.med_d);
      setMedE(response.data.med_e);
      setMedF(response.data.med_f);
      setCreate(response.data.createdAt);
      setUpdate(response.data.updatedAt);
      setAprovado(response.data.aprovado_pedido);
    }
    getPedido();
  }, []);

  async function handleSubmit() {
    const data = {
      nome_pessoa: pessoa,
      idade_pessoa: idade,
      med_a: medA,
      med_b: medB,
      med_c: medC,
      med_d: medD,
      med_e: medE,
      med_f: medF,
      user: user,
      produto: produto,
      entidade: entidade,
      _id: idPedido,
    };

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
        alert('Pedido editado com Sucesso !!');
        window.location.href = '/admin/pedidos';
      } else {
        alert('Erro ao atualizar o pedido!');
      }
    } else {
      alert('Por favor, preencha todos os dados!');
    }
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'Sis Web CRI - Editar Pedido'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} style={{ marginBottom: 30 }} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button
                style={{ marginBottom: 30 }}
                variant="contained"
                color="primary"
                href={'/admin/pedidos'}
              >
                <ArrowBackIcon /> Voltar
              </Button>
              <Button
                style={{ marginBottom: 30 }}
                variant="contained"
                href={'/admin/pedidos/cadastrar'}
              >
                <AddIcon />
                Cadastrar
              </Button>
              <Paper className={classes.paper}>
                <h2>Editar Pedido</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      id="user"
                      name="user"
                      label="Usuário"
                      fullWidth
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      id="produto"
                      name="produto"
                      label="Produto"
                      fullWidth
                      value={produto}
                      onChange={(e) => setProduto(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      id="descricao"
                      name="descricao"
                      label="Entidade"
                      fullWidth
                      value={entidade}
                      onChange={(e) => setEntidade(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormGroup controlId="aprovado">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={aprovado}
                            //onChange={handleChange}
                            onChange={(e) => setAprovado(e.target.checked)}
                            name="aprovado"
                            color="primary"
                          />
                        }
                        label="Aprovado"
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12} sm={3}>
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
                    <TextField
                      label="Criado em: "
                      fullWidth
                      value={createdAt}
                      onChange={(e) => setCreate(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Última edição: "
                      fullWidth
                      value={updatedAt}
                      onChange={(e) => setUpdate(e.target.value)}
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
