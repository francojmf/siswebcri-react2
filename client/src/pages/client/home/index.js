import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import MenuHome from '../../../components/menu-home';
import Footer from '../../../components/footer-admin';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    color: 'green',
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    color: 'green',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MenuHome title={'Sis Web CRI'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        <Container maxWidth="lg" className={classes.container}>
          <div>
            <h1>Bem-vindo ao SisWeb-CRI </h1>
            <p>
              - Para acessar o sistema e fazer pedidos é necessário um cadastro.
            </p>
            <p>- Clique em "Novo Cadastro".</p>
            <p>- Preencha todos os campos obrigatórios.</p>
            <p>- Em seguida acesse o sistema com "Login".</p>
          </div>
          <div>
            Não Cadastrado?
            <Button component={Link} to="/usuarioNovo" color="success">
              Novo Cadastro
            </Button>
          </div>
        </Container>
        <Container>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}
