import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import api from "../../../services/api";
import Swal from "sweetalert2";

import { Balance, Date, Description, Name, Operation, Total, Value } from "./style";

export function BankBalance({ balance }) {
  const title = balance.toString().replace(".", ",");

  return (
    <Balance>
      <span>SALDO</span>
      <Total balance={balance}>{title}</Total>
    </Balance>
  );
}

export function Transaction({
  date,
  description,
  value,
  type,
  _id,
  setIsDeleted,
  isDeleted,
  setFormData,
  setScreen,
  setTypeOfInput,
  setIdToUpdate,
}) {
  const arrDate = date.split("/");
  const { token } = useContext(AuthContext);
  const formatedDate = `${arrDate[0]}/${arrDate[1]}`;

  function requestToDelete(id) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar a transação?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.deleteTransaction(token.token, id);
          setIsDeleted(!isDeleted);
        } catch (error) {
          alert(error.response.data);
        }
      }
    });
  }

  function updateOperation(id) {
    setFormData({
      value,
      description,
    });
    setScreen("update");
    setTypeOfInput(type);
    setIdToUpdate(id);
  }

  return (
    <Operation>
      <Description onClick={() => updateOperation(_id)}>
        <Date>{formatedDate}</Date>
        <Name>{description}</Name>
      </Description>
      <Value type={type}>
        {value.replace(".", ",")}
        <button className="delete" onClick={() => requestToDelete(_id)}>
          X
        </button>
      </Value>
    </Operation>
  );
}
