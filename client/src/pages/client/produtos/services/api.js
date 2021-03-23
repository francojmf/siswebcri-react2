import axios from 'axios';

//const api = axios.create( { baseURL: 'https://cors-anywhere.herokuapp.com//viacep.com.br/ws' });
const api = axios.create({ baseURL: 'https://viacep.com.br/ws/CE/Fortaleza' });

export default api;
