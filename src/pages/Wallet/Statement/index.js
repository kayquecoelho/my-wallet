import { useContext } from "react";
import { Balance, Date, Description, Name, Operation, Total, Value } from "./style";
import AuthContext from "../../../contexts/AuthContext";
import api from "../../../services/api";
export function BankBalance({ balance }){
  const title = balance.toString().replace(".", ",");
  return (
    <Balance>
      <span>SALDO</span>
      <Total balance={balance}>{title}</Total>
    </Balance>
  );
}

export function Transaction({ date, description, value, type, _id, setIsDeleted, isDeleted }){
  const arrDate = date.split("/");
  const { token } = useContext(AuthContext);
  const formatedDate = `${arrDate[0]}/${arrDate[1]}`;
  
  async function requestToDelete(id) { 
    const wantToDelete = window.confirm("Tem certeza que deseja deletar a transação?")
    if (wantToDelete) {
      try {
        await api.deleteTransaction(token.token, id);
        setIsDeleted(!isDeleted);
      } catch (error) {
        alert(error.response.data);
      }
    }
  }
  return (
    <Operation>
      <Description>
        <Date>{formatedDate}</Date>
        <Name>{description}</Name>
      </Description>
      <Value type={type}>
        {value.replace(".",",")}
        <button className="delete" onClick={() => requestToDelete(_id)}>
        X
        </button>
      </Value>
    </Operation>
  );
}