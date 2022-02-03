import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Input, StyledLink, Button } from "../../components/FormComponents";
import Logo from "../../assets/logo.svg";
import api from "../../services/api";

export default function Register () {
  const [formData, setFormData] = useState({
    name: "", 
    email: "",
    password:"",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value})
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword){
      return alert("As senhas não coincidem");
    }
    delete formData.confirmPassword;

    const promise = api.signUp(formData);

    promise.then(() => navigate("/"));
    promise.catch((error) => alert(error.response.data) )
  }
  
  return (
    <Container>
      <img className="logo" src={Logo} alt="My Wallet"/>

      <Form onSubmit={handleSubmit}>
        <Input 
            type="text"
            placeholder="Nome"
            name="name"
            onChange={handleChange}
            value={formData.name}
            required
        />
        <Input 
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            required
        />
        <Input 
            type="password"
            placeholder="Senha"
            name="password"
            onChange={handleChange}
            value={formData.password}
            required
        />
        <Input 
            type="password"
            placeholder="Confirme a senha"
            name="confirmPassword"
            onChange={handleChange}
            value={formData.confirmPassword}
            required
        />
        <Button type="submit">Cadastrar</Button>
      </Form>

      <StyledLink to="/">
        Já tem uma conta? Entre agora!
      </StyledLink>
    </Container>
  )
}