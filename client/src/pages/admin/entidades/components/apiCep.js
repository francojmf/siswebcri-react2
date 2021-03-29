import axios from 'axios';
//import Form3 from './form3';

let url = 'https://viacep.com.br/ws';

const apiCep = axios.create({
  baseURL: url,
});

export default apiCep;
