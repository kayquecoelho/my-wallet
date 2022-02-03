import axios from "axios";

const BASE_URL = "http://localhost:5000"

function signUp(body) {
  const promise = axios.post(`${BASE_URL}/sign-up`, body);

  return promise;
}

function signIn(body) {
  const promise = axios.post(`${BASE_URL}/sign-in`, body);
  
  return promise;
}

function getTransactions(token) {
  const promise = axios.get(`${BASE_URL}/transactions`, {
    headers: {
      Authorization: `Bearer ${token?.token}`
    }
  })

  return promise;
}

const api = {
  signUp,
  signIn,
  getTransactions
}

export default api;