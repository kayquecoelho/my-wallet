import { Balance, Date, Description, Name, Operation, Total, Value } from "./style";

export function BankBalance({ balance }){
  const title = balance.toString().replace(".", ",");
  return (
    <Balance>
      <span>SALDO</span>
      <Total balance={balance}>{title}</Total>
    </Balance>
  );
}

export function Transaction({ date, description, value, type }){
  const arrDate = date.split("/");
  const formatedDate = `${arrDate[0]}/${arrDate[1]}`;
  
  return (
    <Operation>
      <Description>
        <Date>{formatedDate}</Date>
        <Name>{description}</Name>
      </Description>
      <Value type={type}>
        {value.replace(".",",")}
      </Value>
    </Operation>
  );
}