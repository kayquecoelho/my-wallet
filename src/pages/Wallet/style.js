import styled from "styled-components";

const ContainerWallet = styled.div`
  padding: 0 25px;

  display: flex;
  flex-direction: column; 
  align-items: center;
`
const Title = styled.div` 
  width: 100%;

  margin: 25px 0 20px 0;

  display: flex; 
  justify-content: center;

  color: #FFFFFF;
  font-size: 26px;
  font-weight: 700;
  line-height: 31px;

  .username {
    width: 100%;
    display: flex; 
    justify-content: space-between;

    span {
      margin-right: 25px;
    }
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
  justify-content: space-between;

  ${ (props) => props.transactions?.length === 0 && "justify-content: center;" }

  padding: 20px 10px 10px 10px;

  background: #FFFFFF;
  border-radius: 5px;

  .transactions {
    margin-bottom: 25px;
    overflow: scroll;

    -ms-overflow-style: none;  
    scrollbar-width: none;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  @media screen and (min-width: 500px) {
    width: 375px;
  }
`;

const Navigation = styled.nav`
  width: 100%;

  margin-top: 13px;

  display: flex;
  justify-content: space-between;

  @media screen and (min-width: 450px) {
    width: 335px;
  }
`;

const ButtonWallet = styled.button`
  width: 155px;
  height: 114px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 10px; 
  
  margin-bottom: 25px;

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

  cursor: pointer;
`;

export {
  ButtonWallet,
  Title,
  Subtitle,
  Navigation,
  Statement,
  ContainerWallet
}; 