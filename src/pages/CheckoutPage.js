import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ReactLoading from "react-loading";
import "../constants/font.css";
import { colors } from "../constants/colors";
import { signUpURL } from "../constants/links";
import axios from "axios";
import "react-auto-complete-address-fields/build/GoogleAutoComplete.css";

export default function CheckoutPage() {
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (address.length === 0 || phone.length === 0) {
      return;
    }
    const checkoutInfo = {
      name: address,
      email: phone,
    };

    setLoading(true);

    axios.post(signUpURL, checkoutInfo).then(success).catch(fail);
  }
  function success() {
    navigate("/login");
  }
  function fail() {
    setLoading(false);
    alert("Criação de conta falhou!");
  }
  return (
    <Container>
      <Logo>Finalize seu pedido:</Logo>
      <Form onSubmit={handleSubmit}>
        <Field
          placeholder="Endereço"
          type="text"
          name="name"
          onChange={(e) => setAddress(e.target.value)}
        />
        <Field
          placeholder="Telefone"
          type="number"
          name="email"
          onChange={(e) => setPhone(e.target.value)}
        />
        <p>Selecione o método de pagamento:</p>
        <Dropdown id="payment" name="payment">
          <option value="pix">Pix</option>
          <option value="credit">Cartão de Crédito</option>
          <option value="boleto">Boleto</option>
        </Dropdown>
        {loading && (
          <Loading>
            <ReactLoading type={"bubbles"} color={colors.font} width={"20%"} />
          </Loading>
        )}
        {!loading && <Submit type="submit" value="Confirmar pedido" />}
      </Form>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Logo = styled.h1`
  font-size: 32px;
  font-weight: 400;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Field = styled.input`
  height: 55px;
  width: 300px;

  border: none;
  border: 1px solid #dbdbdb;
  border-radius: 5px;

  margin-bottom: 10px;
  font-size: 20px;

  padding-left: 10px;
  background-color: ${colors.fields};

  color: black;

  ::placeholder {
    color: black;
  }
`;
const Dropdown = styled.select`
  height: 55px;
  width: 300px;

  border: none;
  border: 1px solid #dbdbdb;
  border-radius: 5px;

  margin-bottom: 10px;
  font-size: 20px;

  padding-left: 10px;
  background-color: ${colors.fields};

  color: black;

  ::placeholder {
    color: black;
  }
`;
const Submit = styled.input`
  height: 45px;
  width: 300px;

  margin-bottom: 20px;

  background-color: ${colors.buttons};

  font-size: 20px;
  font-weight: 700;

  border: 1px solid black;
  border-radius: 5px;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 45px;
  width: 300px;

  margin-bottom: 20px;

  font-size: 21px;

  border: none;
  border-radius: 5px;
`;
