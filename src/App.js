import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./style/reset.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Wallet from "./pages/Wallet";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wallet" element={<Wallet />} />
      </Routes>
    </BrowserRouter>
  );
}
