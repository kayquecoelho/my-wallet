import styled from "styled-components";

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
`;
const Total = styled.div`
  text-align: right;
  ${(props) => props.balance > 0 && "color: #03AC00"};
  ${(props) => props.balance === 0 && "color: #000000"};
  ${(props) => props.balance < 0 && "color: #C70000"};
`;

const Operation = styled.div`
  width: 100%;

  display: flex; 
  justify-content: space-between;
  align-items: center;

  margin-bottom: 15px;
`;

const Description = styled.div`
  display: flex;
  align-items: center;

  margin-right: 35px;
  word-break: break-all;
`;
const Value = styled.div`
  font-size: 16px;
  line-height: 19px;
  text-align: right;
  color: ${(props) => props.type === "entrada" ? "#03AC00": "#C70000"};
`;
const Date = styled.time`
  color: #C6C6C6;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  word-break: keep-all;
`;
const Name = styled.span`
  color: #000000;
  font-size: 16px;
  line-height: 19px;
`;

export {
  Name, 
  Date,
  Value,
  Description,
  Balance,
  Total,
  Operation
};