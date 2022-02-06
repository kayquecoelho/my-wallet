import styled from "styled-components";

const Button = styled.button`
  width: 330px;
  height: 46px;

  background-color: #a328d6;
  border-radius: 5px;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #ffffff;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;

  ${(props) => props.disabled && "opacity: 0.7;"}

  :hover {
    cursor: pointer;
  }
`;

export default Button;
