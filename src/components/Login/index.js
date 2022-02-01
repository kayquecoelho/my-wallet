import styled from "styled-components";
import { useState } from "react";
import Logo from '../../assets/logo.svg';
import { Link } from "react-router-dom";

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

const Container = styled.div`
  width: 100%;
  height: 100vh;

  padding: 25px;

  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;

  background-color: #9257BE;

  .logo {
    margin-bottom: 25px; 
  }
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  margin-bottom: 35px;
`
const Input = styled.input`
  width: 330px;
  height: 58px;

  padding: 15px;

  background: #FFFFFF;
  border-radius: 5px;
  border: none;

  color: #000000;
  font-size: 20px;
  line-height: 23px;

  ::placeholder {
    color: #000000;
    font-size: 20px;
    line-height: 23px;
  }
`
const Button = styled.button`
  width: 330px;
  height: 46px;
  
  background-color: #A328D6;
  border-radius: 5px;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #FFFFFF;
  font-weight: 700;
`
const StyledLink = styled(Link)`
  color: #FFFFFF;
  font-size: 15px;
  font-weight: 700;
  line-height: 18px;
  text-decoration: none;
`