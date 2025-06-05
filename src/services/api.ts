import axios from "axios";

const api = axios.create({
  baseURL: "http://172.16.0.31:3000", // Troque pelo IP da sua máquina ou da API hospedada
});

export default api;
