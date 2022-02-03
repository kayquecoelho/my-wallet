import { useState, useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";

import { Button, Container, Form, Input } from "../../components/FormComponents"
import { ButtonWallet, Navigation, Statement, Title, Subtitle } from "./style";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Wallet() {
  const { token } = useContext(AuthContext);
  const [screen, setScreen] = useState("wallet");
  const [typeOfInput, setTypeOfInput] = useState("");
  const [transactions, setTransactions] = useState(null);
  const [formData, setFormData] = useState({ 
    value: "",
    description: ""
  });
  const navigate = useNavigate();
  console.log(transactions)

  useEffect(() => {
    const promise = api.getTransactions(token);

    promise.then((response) => setTransactions(response.data));
    promise.catch(() => navigate("/"))
  }, []);

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
        <span>Olá, {token ? token.name: ""}</span> 
        <ion-icon className="logout" name="log-out-outline"/>
      </Title>

      <Statement transactions={transactions}>
        {!transactions && <Subtitle>Não há registros de entrada ou saída</Subtitle>}
        {transactions && "Hello World"}
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