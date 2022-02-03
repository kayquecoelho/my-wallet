import { useState } from "react";
import Logo from '../../assets/logo.svg';
import { Container, Form, Input, StyledLink, Button } from '../../components/FormComponents';
import api from "../../services/api";

export default function Login () {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  function handleSubmit(e){
    e.preventDefault();

    const promise = api.signIn({ ...formData });

    promise.then((response) => console.log(response.data));
    promise.catch((error) => alert(error.response.data))
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