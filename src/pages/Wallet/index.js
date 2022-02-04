import { useState, useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";

import { Button, Container, Form, Input } from "../../components/FormComponents"
import { ButtonWallet, Navigation, Statement, Title, Subtitle } from "./style";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
        <div className="transactions">
          {transactions && transactions.transactions.map((t) => <Transaction key={t._id} {...t} />)}
        </div>
        {transactions && <BankBalance></BankBalance>}
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

function BankBalance(){
  const [balance, setBalance] = useState(2500);

  return (
    <Balance>
      <span>SALDO</span>
      <Total balance={balance}>{balance}</Total>
    </Balance>
  )
}
const Balance = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 17px;
  line-height: 20px;
  
  span {
    color: #000000;
    font-weight: 700;
  }
`
const Total = styled.div`
  text-align: right;
  color: ${(props) => props.balance >= 0 ? "#03AC00": "#C70000"};
`
function Transaction({ date, description, value, type }){
  const arrDate = date.split("/");
  const formatedDate = `${arrDate[0]}/${arrDate[1]}`;
  return (
    <Operation>
      <Description>
        <Date>{formatedDate}</Date>
        <Name>{description}</Name>
      </Description>
      <Value type={type}>
        {value}
      </Value>
    </Operation>
  )
}

const Operation = styled.div`
  width: 100%;

  display: flex; 
  justify-content: space-between;
  align-items: center;

  margin-bottom: 15px;
`

const Description = styled.div`
  display: flex;
  align-items: center;

  margin-right: 35px;
  word-break: break-all;
`
const Value = styled.div`
  font-size: 16px;
  line-height: 19px;
  text-align: right;
  color: ${(props) => props.type === "entrada"? "#03AC00": "#C70000"};
`
const Date = styled.time`
  color: #C6C6C6;
  font-size: 16px;
  line-height: 19px;

  margin-right: 10px;
  word-break: keep-all;
`
const Name = styled.span`
  color: #000000;
  font-size: 16px;
  line-height: 19px;
`