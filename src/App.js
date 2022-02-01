import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./style/reset.css";

import Login from "./components/Login";

export default function App () {
 
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/register"/>
    </Routes>
    </BrowserRouter>
  )
}