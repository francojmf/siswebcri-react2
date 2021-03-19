import React, { useState } from 'react';
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

export default function EntidadeCadastrar() {
  const classes = useStyles();
  //  const nomeUsuario = getNomeUsuario();
  const idUsuario = getIdUsuario();
  const [nome, setNome] = useState('');
  const [cpf_cnpj, setCpf] = useState('');
  const [fone, setFone] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  async function handleSubmit() {
    const data = {
      user: idUsuario,
      nome_entidade: nome,
      cpf_cnpj: cpf_cnpj,
      fone_entidade: fone,
      logradouro: logradouro,
      numero: numero,
      complemento: complemento,
      cep: cep,
      cidade: cidade,
      estado: estado,
    };

    if (
      nome !== '' &&
      cpf_cnpj !== '' &&
      fone !== '' &&
      logradouro !== '' &&
      numero !== '' &&
      complemento !== '' &&
      cep !== '' &&
      cidade !== '' &&
      estado !== ''
    ) {
      const response = await api.post('/api/entidades', data);
      if (response.status === 200) {
        window.location.href = '/client/entidades';
      } else {
        alert('Erro ao cadastrar a entidade!');
      }
    } else {
      alert('Por favor, preencha todos os dados!');
    }
  }

  return (
    <div className={classes.root}>
      <MenuUsuario title={'Sis Web CRI - Nova Entidade'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} style={{ marginBottom: 30 }} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button
                style={{ marginBottom: 30 }}
                variant="contained"
                color="success"
                href={'/client/pedidos'}
              >
                <ArrowBackIcon /> Voltar
              </Button>
              <Paper className={classes.paper}>
                <h2>Cadastro de Nova Entidade</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={7}>
                    <TextField
                      required
                      type="name"
                      id="nome"
                      name="nome"
                      label="Nome da Entidade"
                      fullWidth
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      required
                      type="name"
                      id="cpf_cnpj"
                      name="cpf_cnpj"
                      label="CNPJ da entidade ou CPF do responsável"
                      fullWidth
                      value={cpf_cnpj}
                      onChange={(e) => setCpf(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={7}>
                    <TextField
                      type="name"
                      required
                      id="logradouro"
                      name="logradouro"
                      label="Logradouro"
                      fullWidth
                      value={logradouro}
                      onChange={(e) => setLogradouro(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      type="number"
                      required
                      id="numero"
                      name="numero"
                      label="Numero"
                      fullWidth
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <TextField
                      required
                      type="name"
                      id="complemento"
                      name="complemento"
                      label="Complemento do endereço"
                      fullWidth
                      value={complemento}
                      onChange={(e) => setComplemento(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      type="name"
                      id="cep"
                      name="cep"
                      label="CEP do logradouro"
                      fullWidth
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      required
                      type="name"
                      id="cidade"
                      name="cidade"
                      label="Cidade"
                      fullWidth
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      type="name"
                      id="estado"
                      name="estado"
                      label="Estado"
                      fullWidth
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      type="name"
                      id="fone"
                      name="fone"
                      label="Telefone de contato"
                      fullWidth
                      value={fone}
                      onChange={(e) => setFone(e.target.value)}
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
