import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

import { Container, Form, Input, StyledLink, Button, Loading } from '../../components/FormComponents';
import api from "../../services/api";
import Logo from '../../assets/logo.svg';

export default function Login () {
  const { setToken } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const [disableForm, setDisableForm] = useState(false);

  function handleSubmit(e){
    e.preventDefault();
    setDisableForm(true);

    const promise = api.signIn({ ...formData });

    promise.then((response) => {
      setToken(response.data)
      navigate("/wallet")
    });
    promise.catch((error) => {
      alert(error.response.data)
      setDisableForm(false);
    })
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
          disabled={disableForm}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          name="password"
          onChange={handleChange}
          value={formData.password}
          disabled={disableForm}
          required
        />
        <Button type="submit" disabled={disableForm}>
          {!disableForm && "Entrar"}
          {disableForm && <Loading></Loading>}
        </Button>
      </Form>

      <StyledLink to="/register">
        Primeira vez? Cadastre-se!
      </StyledLink>
    </Container>
  )
}