import { useState } from "react";
import Logo from '../../assets/logo.svg';
import { Container, Form, Input, StyledLink, Button } from '../../components/FormComponents';

export default function Login () {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  function handleSubmit(e){
    e.preventDefault();
  }
  function handleChange(e){
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  return (
    <Container>
      <img className="logo" src={Logo} alt="MyWallet" />
      <Form onSubmit={handleSubmit}>
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
        <Button>Entrar</Button>
      </Form>

      <StyledLink to="/register">
        Primeira vez? Cadastre-se!
      </StyledLink>
    </Container>
  )
}