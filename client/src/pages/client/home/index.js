import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import MenuHome from '../../../components/menu-home';
import Footer from '../../../components/footer-admin';
import { useStyles } from '../../../functions/use_styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';

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
            <p>- Clique no link abaixo em "Cadastrar Novo Usuário".</p>
            <p>- Preencha todos os campos obrigatórios.</p>
            <p>- Em seguida acesse o sistema clicando em "Fazer Login".</p>
          </div>
          <div>
            <ListItem button component="a" href={'/usuario/cadastrar'}>
              <ListItemIcon>
                <PersonIcon style={{ color: 'green' }} />
              </ListItemIcon>
              <ListItemText primary="Cadastrar Novo Usuário" />
            </ListItem>
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
