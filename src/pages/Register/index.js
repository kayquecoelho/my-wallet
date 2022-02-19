import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Swal from "sweetalert2";

import { Container, Form,Input, StyledLink, Button, Loading } from "../../components/FormComponents";
import Logo from "../../assets/logo.svg";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [disableForm, setDisableForm] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-center',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'As senhas não coincidem',
      });
    }

    setDisableForm(true);
    const body = {...formData};
    delete body.confirmPassword;

    const promise = api.signUp(body);

    promise.then(() => {
      Toast.fire({
        icon: 'success',
        title: 'Cadastro realizado!'
      })
      navigate("/");
    });
    promise.catch(({ response }) => {
      if (response.status === 422) {
        Swal.fire({
          icon: 'error',
          title: 'Formato Inválido!',
          text: 'Nome deve ter pelo menos 3 caracteres, sem números. A senha deve ter pelo menos 3 caracteres',
        })
      } else if (response.status === 409) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuário já existe',
        })
      }
      
      setDisableForm(false);
    });
  }

  return (
    <Container>
      <img className="logo" src={Logo} alt="My Wallet" />

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nome"
          name="name"
          onChange={handleChange}
          value={formData.name}
          disabled={disableForm}
          autoComplete="off"
          autoFocus
          required
        />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          disabled={disableForm}
          autoComplete="off"
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
        <Input
          type="password"
          placeholder="Confirme a senha"
          name="confirmPassword"
          onChange={handleChange}
          value={formData.confirmPassword}
          disabled={disableForm}
          autoComplete="off"
          required
        />
        <Button type="submit" disabled={disableForm}>
          {disableForm ? <Loading /> : "Cadastrar"}
        </Button>
      </Form>

      <StyledLink to="/">Já tem uma conta? Entre agora!</StyledLink>
    </Container>
  );
}
