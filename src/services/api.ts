import axios from "axios";

const api = axios.create({
  baseURL: "http://10.0.1.89:3000", // Troque pelo IP da sua máquina ou da API hospedada 172.16.0.31 > FAG
});

export default api;
