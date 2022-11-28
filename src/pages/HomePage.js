import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.jpg";
import { productsURL } from "../constants/links";
import Swal from "sweetalert2";
import { UserContext } from "../App";
import { cartURL } from "../constants/links";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const { userData } = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(productsURL)
      .then((data) => {
        setProducts(data.data);
      })
      .catch((data) => {
        console.log(data);
      });
    if (userData) {
      axios
        .get(cartURL, {
          headers: { Authorization: `Bearer ${userData.token}` },
        })
        .then((response) => setCart(response.data.map((item) => item.gameId)));
    }
  }, [userData]);

  function manageCart(gameID) {
    if (!userData) {
      Swal.fire("Você precisa estar logado para isso!");
      return;
    }
    if (!cart.includes(gameID)) {
      addToCart(gameID);
    } else {
      removeFromCart(gameID);
    }
  }

  function addToCart(gameID) {
    axios
      .post(
        cartURL,
        { game: gameID },
        { headers: { Authorization: `Bearer ${userData.token}` } }
      )
      .then(() => {
        const newCart = [...cart, gameID];
        setCart(newCart);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data,
          footer: `Error status ${error.response.status}`,
        });
      });
  }

  function removeFromCart(gameID) {
    axios
      .delete(`${cartURL}/${gameID}`, {
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then(() => {
        const newCart = cart.filter((item) => item !== gameID);
        setCart(newCart);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data,
          footer: `Error status ${error.response.status}`,
        });
      });
  }

  return (
    <Container>
      <TopBar>
        <img src={logo} alt="dado d20" />
        <div>
          <ion-icon name="search"></ion-icon>
          <ion-icon
            name="cart"
            onClick={() =>
              !userData
                ? Swal.fire("Você precisa estar logado para isso!")
                : navigate("/cart")
            }
          ></ion-icon>
          <ion-icon name="person" onClick={() => navigate("/login")}></ion-icon>
        </div>
      </TopBar>
      <ProductList>
        {products.map((prod) => (
          <Product key={prod._id}>
            <img src={prod.image} alt="boardgame" />
            <ProductName>{prod.name}</ProductName>
            <ProductInfo>
              <ion-icon name="people-outline" />
              <span>{prod.players}</span>
              <ion-icon name="timer-outline" />
              <span>{prod.time}</span>
              <ion-icon name="star-half-outline" />
              <span>{prod.rating}</span>
            </ProductInfo>
            <Price>
              <p>R$ {String(prod.price.toFixed(2)).replace(".", ",")}</p>
              <ion-icon
                name={cart.includes(prod._id) ? "cart" : "cart-outline"}
                onClick={() => manageCart(prod._id)}
              ></ion-icon>
            </Price>
          </Product>
        ))}
      </ProductList>
    </Container>
  );
}

const Container = styled.div`
  position: relative;

  padding: 20px;

  display: flex;
  flex-direction: column;
`;

const TopBar = styled.header`
  width: 100%;

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

const ProductList = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 60px;
`;
const Product = styled.div`
  margin: 8px;
  padding: 10px;
  max-width: 215px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  img {
    max-width: 180px;
  }
`;
const ProductName = styled.h2`
  font-size: 25px;
  font-weight: 700;
  margin: 10px 0 10px 0;
`;
const ProductInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  span {
    font-size: 12px;
  }
`;

const Price = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  p {
    font-size: 25px;
    font-weight: 700;
  }
  ion-icon {
    font-size: 25px;
  }
`;
