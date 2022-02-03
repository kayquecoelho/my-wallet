import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./style/reset.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Wallet from "./pages/Wallet";
import AuthContext from "./contexts/AuthContext";

export default function App() {
  const [token, setToken] = useState();

  console.log(token)
  return (
   <AuthContext.Provider value={{ token, setToken }}>
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
