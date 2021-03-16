import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import MenuHome from '../../../components/menu-home';
import Footer from '../../../components/footer-admin';
import { useStyles } from '../../../functions/use_styles';

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
            <p>- Clique no link abaixo em "NOVO CADASTRO".</p>
            <p>- Preencha todos os campos obrigatórios.</p>
            <p>- Em seguida acesse o sistema clicando em "Fazer Login".</p>
          </div>
          <div>
            Não Cadastrado?
            <Button component={Link} to="/usuarioNovo" color="primary">
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
