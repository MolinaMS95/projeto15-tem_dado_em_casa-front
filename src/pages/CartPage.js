import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../App";
import { cartURL } from "../constants/links";

export default function CartPage() {
  const { userData } = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const [sum, setSum] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(cartURL, { headers: { Authorization: `Bearer ${userData.token}` } })
      .then((response) => {
        setCart(response.data);
        let total = 0;
        response.data.forEach((item) => (total += item.price));
        setSum(total);
      });
  }, [userData]);

  return (
    <Container>
      <TopBar>
        <p>Carrinho de {userData.user}</p>
      </TopBar>
      <CartDisplay>
        {cart.length === 0 ? (
          <p>Vocẽ não possui itens em seu carrinho.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item._id}>
                <p>{item.gameName}</p>
                <p>R$ {String(item.price.toFixed(2)).replace(".", ",")}</p>
              </div>
            ))}
            <TotalDisplay>
              <p>TOTAL</p>
              <p>R$ {String(sum.toFixed(2)).replace(".", ",")}</p>
            </TotalDisplay>
          </>
        )}
      </CartDisplay>
      <ButtonsContainer>
        <button onClick={() => navigate("/")}>Voltar para produtos</button>
        <button
          onClick={() => navigate("/checkout")}
          disabled={cart.length === 0}
        >
          Prosseguir para o checkout
        </button>
      </ButtonsContainer>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const TopBar = styled.header`
  width: 100%;

  position: fixed;
  left: 0px;
  top: 0px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #191919;
  p {
    color: white;
    font-weight: 700;
    font-size: 20px;
  }
`;

const CartDisplay = styled.div`
  width: 90%;
  height: 70%;

  margin-top: 90px;

  display: flex;
  flex-direction: column;

  position: relative;
  overflow-y: scroll;
  div {
    width: 100%;
    display: flex;
    justify-content: space-between;

    font-weight: 700;
  }
`;

const TotalDisplay = styled.div`
  position: absolute;
  left: 0px;
  bottom: 0px;
  p {
    color: red;
  }
`;

const ButtonsContainer = styled.div`
  width: 90vw;
  display: flex;
  justify-content: space-between;

  margin-top: 20px;

  button {
    width: 200px;

    background: #191919;

    border: none;
    border-radius: 5px;

    font-weight: 700;
    color: white;

    text-align: center;
  }
`;
