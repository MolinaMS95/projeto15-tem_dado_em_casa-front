import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ReactLoading from "react-loading";
import "../constants/font.css";
import { colors } from "../constants/colors";
import { cartURL, orderURL } from "../constants/links";
import axios from "axios";
import "react-auto-complete-address-fields/build/GoogleAutoComplete.css";
import { UserContext } from "../App";
import Swal from "sweetalert2";

export default function CheckoutPage() {
  const { userData } = useContext(UserContext);
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [sum, setSum] = useState(0);
  const [payment, setPayment] = useState("pix");
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

  function handleSubmit(event) {
    event.preventDefault();
    if (address.length === 0 || phone.length === 0) {
      return;
    }
    console.log(cart);
    const orderInfo = {
      address: address,
      phone: phone,
      payment: payment,
      items: cart,
      total: sum,
    };

    setLoading(true);

    axios
      .post(orderURL, orderInfo, {
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then(success)
      .catch(fail);
  }

  function success() {
    Swal.fire("Pedido concluído com sucesso!");
    navigate("/");
  }
  function fail() {
    setLoading(false);
    Swal.fire("Algo deu errado, tente novamente mais tarde.");
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
          type="text"
          name="email"
          onChange={(e) => setPhone(e.target.value)}
        />
        <p>Selecione o método de pagamento:</p>
        <Dropdown
          id="payment"
          name="payment"
          onChange={(e) => setPayment(e.target.value)}
        >
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
