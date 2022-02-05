import { useState, useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";

import { Button, Container, Form, Input, Loading } from "../../components/FormComponents"
import { ButtonWallet, Navigation, Statement, Title, Subtitle, ContainerWallet } from "./style";
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
    description: "",
  });
  const navigate = useNavigate();
  const [disableForm, setDisableForm] = useState(false);
  const [balance, setBalance] = useState(0);
  
  useEffect(() => {
    const promise = api.getTransactions(token);

    promise.then((response) => {
      setTransactions(response.data);
    });
    promise.catch(() => navigate("/"))
  }, [screen]);

  function changeToInput(type) {
    setScreen("adicionar");
    setTypeOfInput(type);
  }

  function handleChange(e){
    setFormData({ ...formData, [e.target.name]: e.target.value});
  }

  function handleSubmit(e){
    e.preventDefault();
    setDisableForm(true);

    const isValueANumber = Number(formData.value);
    if (!isValueANumber || typeof formData.description !== "string"){
      return alert("Os dados não estão no formato correto");
    }
    const body = {
      ...formData,
      type: typeOfInput
    };

    const promise = api.registrateTransaction(token.token, body);

    promise.then(() => {
      setScreen("wallet");
      setFormData({ 
        value: "",
        description: "",
      });
      setDisableForm(false)
    });

    promise.catch((error) => {
      alert(error.response.data);
      setDisableForm(false);
    })
  }

  if (screen !== "wallet") {
    return (
      <Container>
        <Title>Nova {typeOfInput}</Title>
        <Form onSubmit={handleSubmit}>
          <Input 
              type="number"
              placeholder="Valor"
              name="value"
              onChange={handleChange}
              value={formData.value}
              required
              disabled={disableForm}
          />
          <Input 
              type="text"
              placeholder="Nome"
              name="description"
              onChange={handleChange}
              value={formData.description}
              required
              disabled={disableForm}
          />
          <Button disabled={disableForm}type="submit">
            {!disableForm && `Salvar ${typeOfInput}`}
            {disableForm && <Loading></Loading>}
            
          </Button>
        </Form>
      </Container>
    )
  }

  return (
    <ContainerWallet>
      <Title>
        <span>Olá, {token ? token.name: ""}</span> 
        <ion-icon className="logout" name="log-out-outline"/>
      </Title>

      <Statement transactions={transactions}>
        {!transactions && <Subtitle>Não há registros de entrada ou saída</Subtitle>}
        <div className="transactions">
          {transactions && transactions.transactions.map((t) => <Transaction key={t._id} {...t} />)}
        </div>
        {transactions && <BankBalance>{balance}</BankBalance>}
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
    </ContainerWallet>
  );
}

function BankBalance({children}){
  
  return (
    <Balance>
      <span>SALDO</span>
      <Total balance={children}>{children}</Total>
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
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  word-break: keep-all;
`
const Name = styled.span`
  color: #000000;
  font-size: 16px;
  line-height: 19px;
`