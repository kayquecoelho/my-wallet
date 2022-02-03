import styled from "styled-components";

const Title = styled.div` 
  width: 100%;

  margin: 25px 0 20px 0;

  display: flex; 
  justify-content: space-between;

  color: #FFFFFF;
  font-size: 26px;
  font-weight: 700;
  line-height: 31px;

  span {
    margin-right: 25px;
  }
`;

const Subtitle = styled.div`
  color: #868686;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
`;

const Statement = styled.div`
  width: 100%;
  height: 446px;

  display: flex; 
  flex-direction: column;

  ${ (props) => !props.transactions && "justify-content: center;" }

  padding: 20px 10px 10px 10px;

  background: #FFFFFF;
  border-radius: 5px;
`;

const Navigation = styled.nav`
  width: 100%;

  margin-top: 13px;

  display: flex;
  justify-content: space-between;
`;

const ButtonWallet = styled.button`
  width: 155px;
  height: 114px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 10px; 
  margin-bottom: 40px;

  background-color: #A328D6;
  border-radius: 5px;
  border: none;

  color: #FFFFFF;

  ion-icon {
    font-size: 25px;
    margin-bottom: 30px;
  }

  span {
    display: block;

    font-size: 17px;
    font-weight: 700;
    line-height: 20px;
  }
`;

export {
  ButtonWallet,
  Title,
  Subtitle,
  Navigation,
  Statement
}; 