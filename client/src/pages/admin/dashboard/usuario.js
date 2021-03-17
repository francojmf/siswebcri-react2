import React from 'react';
import ImgCri from '../../../assets/img/cri01.jpg';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

export default function Dashboard() {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colspan="12">
              <h1 align="center">Bem-vindo ao SisWeb-CRI </h1>
            </th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td colspan="12">
              <h4 align="center">- Acesse as opções no menu lateral.</h4>
            </td>
          </tr>
        </tfoot>
        <tbody>
          <tr>
            <td colspan="6">Este é o modelo de cadeira de rodas disponível:</td>
            <td rowspan="2" colspan="6">
              <p>- Você tem acesso como Usuário comum e pode:</p>
              <p>- Editar seus dados e pedidos.</p>
              <p>- Fazer novos pedidos.</p>
              <h4>Aviso</h4>
              <p>
                - Ao realizar o cadastro você estará concordando com os Termos
                de Uso da UNIFESP.
              </p>
              <AccountBalanceIcon style={{ color: 'green' }} />
              <a href="https://www.unifesp.br/termos-de-uso">
                * Termos de Uso : UNIFESP *
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <img src={ImgCri} />
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
