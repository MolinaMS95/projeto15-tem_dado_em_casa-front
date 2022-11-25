import styled from "styled-components";
import logo from "../assets/logo.jpg";

export default function HomePage(props) {
  return (
    <Container>
      <TopBar>
        <img src={logo} alt="dado d20" />
        <div>
          <ion-icon name="search"></ion-icon>
          <ion-icon name="cart"></ion-icon>
          <ion-icon name="person"></ion-icon>
        </div>
      </TopBar>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;

  padding: 20px;

  display: flex;
  flex-direction: column;
`;

const TopBar = styled.header`
  width: 100vw;

  position: fixed;
  left: 0px;
  top: 0px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #191919;

  ion-icon {
    color: white;
    font-size: 40px;
  }

  img {
    width: 70px;
  }
`;
