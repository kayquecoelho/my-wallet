import axios from "axios";

const BASE_URL = "https://backend-my-wallet-kayque.herokuapp.com";

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
      Authorization: `Bearer ${token?.token}`,
    },
  });

  return promise;
}

function registrateTransaction(token, body) {
  const promise = axios.post(`${BASE_URL}/transactions`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return promise;
}

function deleteTransaction(token, id) {
  const promise = axios.delete(`${BASE_URL}/transactions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return promise;
}

function updateTransaction(token, id, body) {
  const promise = axios.put(`${BASE_URL}/transactions/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return promise;
}

const api = {
  signUp,
  signIn,
  getTransactions,
  registrateTransaction,
  deleteTransaction,
  updateTransaction,
};

export default api;
