import styled from "styled-components";

const ContainerWallet = styled.div`
  padding: 0 25px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  width: 100%;

  margin: 25px 0 20px 0;

  display: flex;
  justify-content: center;

  color: #ffffff;
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

  .logout {
    cursor: pointer;

    background-color: inherit;
    border: none;
    ion-icon {
      color: #ffffff;
      font-size: 25px;
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
  min-height: 360px;
  max-height: 446px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${(props) => props.transactions?.length === 0 && "justify-content: center;"}

  padding: 20px 10px 10px 10px;

  background: #ffffff;
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
    width: 335px;
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

  background-color: #a328d6;
  border-radius: 5px;
  border: none;

  color: #ffffff;
  cursor: pointer;

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

  @media screen and (max-width: 360px) {
    width: 120px;
    height: 110px;

    ion-icon {
      font-size: 25px;
      margin-bottom: 20px;
    }
  }
`;

export {
  ButtonWallet,
  Title,
  Subtitle,
  Navigation,
  Statement,
  ContainerWallet,
};
