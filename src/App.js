import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./style/reset.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Wallet from "./pages/Wallet";
import AuthContext from "./contexts/AuthContext";

export default function App() {
  const localToken = JSON.parse(localStorage.getItem("token"));
  const [token, setToken] = useState(localToken);

  function setAndPersistToken(token) {
    setToken(token);
    localStorage.setItem("token", JSON.stringify(token));
  }

  return (
    <AuthContext.Provider value={{ token, setToken, setAndPersistToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
