import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.jpg";
import { productsURL } from "../constants/links";

export default function HomePage(props) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(productsURL)
      .then((data) => {
        setProducts(data.data);
      })
      .catch((data) => {
        console.log(data);
      });
  }, []);
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
      <ProductList>
        {products.map((prod) => {
          return (
            <Product key={prod._id} id={prod._id}>
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
                <p>R$ {prod.price}</p>
                <ion-icon name="cart-outline"></ion-icon>
              </Price>
            </Product>
          );
        })}
        <Product>
          <img src="https://cf.geekdo-images.com/tSuS_euvyGkGy_ZKavd3Lg__original/img/dKqocpEJMXTMWIwq2uo77rGVXTQ=/0x0/filters:format(jpeg)/pic1801794.jpg" />
          <ProductName>Guerra do Anel</ProductName>
          <ProductInfo>
            <ion-icon name="people-outline" />
            <span>60-500</span>
            <ion-icon name="timer-outline" />
            <span>60-500</span>
            <ion-icon name="star-half-outline" />
            <span>60-500</span>
          </ProductInfo>
          <Price>
            <p>R$ 1044,38</p>
            <ion-icon name="cart-outline"></ion-icon>
          </Price>
        </Product>
      </ProductList>
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
