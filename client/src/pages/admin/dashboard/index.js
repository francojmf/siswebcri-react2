import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
//import Paper from '@material-ui/core/Paper';

import { getTipoUsuario } from '../../../services/auth';
import MenuAdmin from '../../../components/menu-admin';
import MenuGerente from '../../../components/menu-gerente';
import MenuUsuario from '../../../components/menu-usuario';
import Footer from '../../../components/footer-admin';

import DashUsuario from './usuario';
import DashGerente from './gerente';
import DashAdmin from './admin';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
    color: 'green',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    color: 'green',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    color: 'green',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    color: 'green',
  },
}));

function getDashboard() {
  if (getTipoUsuario() === '1') {
    return <DashAdmin />;
  } else if (getTipoUsuario() === '2') {
    return <DashGerente />;
  } else {
    return <DashUsuario />;
  }
}
function getMenu() {
  if (getTipoUsuario() === '1') {
    return <MenuAdmin title={'Tela Administrador'} />;
  } else if (getTipoUsuario() === '2') {
    return <MenuGerente title={'Tela Gerente'} />;
  } else {
    return <MenuUsuario title={'Tela de Usuário'} />;
  }
}

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {getMenu()}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {getDashboard()}
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}
