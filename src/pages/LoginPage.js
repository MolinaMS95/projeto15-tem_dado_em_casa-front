import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ReactLoading from "react-loading";
import "../constants/font.css";
import { colors } from "../constants/colors";
import { loginURL } from "../constants/links";
import axios from "axios";

export default function LoginPage(props) {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (email.length === 0 || pass.length === 0) {
      return;
    }
    const loginInfo = {
      email: email,
      password: pass,
    };

    setLoading(true);

    axios.post(loginURL, loginInfo).then(success).catch(fail);
  }
  function success(received) {
    props.set(received.data);
    navigate("/");
  }
  function fail(data) {
    setLoading(false);
    alert("Login falhou!");
  }
  return (
    <Container>
      <Logo>Tem dado em casa?</Logo>
      <Form onSubmit={handleSubmit}>
        <Field
          placeholder="E-mail"
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          placeholder="Senha"
          type="password"
          name="password"
          onChange={(e) => setPass(e.target.value)}
        />

        {loading && (
          <Loading>
            <ReactLoading type={"bubbles"} color={colors.font} width={"20%"} />
          </Loading>
        )}
        {!loading && <Submit type="submit" value="Entrar" />}
      </Form>
      <Link to={`/signup/`}>
        <SignUp>Primeira vez? Cadastre-se!</SignUp>
      </Link>
    </Container>
  );
}
const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Logo = styled.h1`
  font-family: "Roboto", cursive;
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
const Submit = styled.input`
  height: 45px;
  width: 300px;

  margin-bottom: 20px;

  background-color: ${colors.buttons};

  font-size: 20px;
  font-weight: 700;

  border: none;
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

const SignUp = styled.p`
  font-size: 15px;
  font-weight: 700;
`;
