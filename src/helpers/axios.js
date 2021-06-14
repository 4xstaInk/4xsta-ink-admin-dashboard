import axios from 'axios';

let token = localStorage.getItem('token');

axios.defaults.headers.common['Authorization']=`Bearer ${token}`;