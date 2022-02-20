import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

import { Container, Form, Input, StyledLink, Button, Loading } from "../../components/FormComponents";
import api from "../../services/api";
import Logo from "../../assets/logo.svg";
import Swal from "sweetalert2";

export default function Login() {
  const { setAndPersistToken } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [disableForm, setDisableForm] = useState(false);
  const navigate = useNavigate();
  const localToken = localStorage.getItem("token");
  
  useEffect(() => {
    if (localToken) {
      navigate("/wallet");
    }
  }, [localToken, navigate]);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    setDisableForm(true);

    const promise = api.signIn({ ...formData });

    promise.then((response) => {
      Toast.fire({
        icon: 'success',
        title: 'Você está logado!'
      })
      setAndPersistToken(response.data);
      navigate("/wallet");
    });
    promise.catch(({ response }) => {
      if (response.status === 401){
        Swal.fire({
          icon: 'error',
          text: "Email e/ou senha incorretos!",
        })
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Oops..!',
          text: 'Estamos com problemas! Tente novamente mais tarde'
        })
      }
      
      setDisableForm(false);
    });
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          autoComplete="off"
          autoFocus
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          name="password"
          onChange={handleChange}
          value={formData.password}
          disabled={disableForm}
          autoComplete="off"
          required
        />
        <Button type="submit" disabled={disableForm}>
          {disableForm ? <Loading /> : "Entrar"}
        </Button>
      </Form>

      <StyledLink to="/register">Primeira vez? Cadastre-se!</StyledLink>
    </Container>
  );
}
