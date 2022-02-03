import { useState } from "react";
import styled from "styled-components";
import { Button, Container, Form, Input } from "../../components/FormComponents"
import { ButtonWallet, Navigation, Statement, Title } from "./style";

export default function Wallet(props) {
  const [screen, setScreen] = useState("wallet");
  const [typeOfInput, setTypeOfInput] = useState("");
  const [formData, setFormData] = useState({ 
    value: "",
    description: ""
  });

  function changeToInput(type) {
    setScreen("adicionar");
    setTypeOfInput(type);
  }

  function handleChange(e){
    setFormData({ ...formData, [e.target.name]: e.target.value});
  }

  function handleSubmit(e){
    e.preventDefault();
  }

  if (screen !== "wallet") {
    return (
      <Container>
        <Title>Nova {typeOfInput}</Title>
        <Form onSubmit={handleSubmit}>
          <Input 
              type="text"
              placeholder="Nome"
              name="name"
              onChange={handleChange}
              value={formData.value}
              required
          />
          <Input 
              type="text"
              placeholder="Nome"
              name="name"
              onChange={handleChange}
              value={formData.description}
              required
          />
          <Button type="submit">Salvar {typeOfInput}</Button>
        </Form>
      </Container>
    )
  }

  return (
    <Container>
      <Title>
        <span>Olá, {props.name}</span> 
        <ion-icon className="logout" name="log-out-outline"/>
      </Title>

      <Statement>

      </Statement>

      <Navigation>
        <ButtonWallet onClick={() => changeToInput("entrada")}>
          <ion-icon name="add-circle-outline"/>
          <span>Nova</span>
          <span>entrada</span>
        </ButtonWallet>
        <ButtonWallet onClick={() => changeToInput("saída")}>
          <ion-icon name="remove-circle-outline"/>
          <span>Nova</span>
          <span>saída</span>
        </ButtonWallet>
      </Navigation>
    </Container>
  );
}