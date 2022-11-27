import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ReactLoading from "react-loading";
import "../constants/font.css";
import { colors } from "../constants/colors";
import { signUpURL } from "../constants/links";
import axios from "axios";

export default function SignUpPage(props) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [repeatPass, setRepeatPass] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (
      name.length === 0 ||
      email.length === 0 ||
      pass.length === 0 ||
      pass !== repeatPass
    ) {
      return;
    }
    const signUpInfo = {
      name: name,
      email: email,
      password: pass,
    };

    setLoading(true);

    axios.post(signUpURL, signUpInfo).then(success).catch(fail);
  }
  function success(received) {
    props.set(received.data);
    navigate("/login");
  }
  function fail(data) {
    setLoading(false);
    alert("Criação de conta falhou!");
  }
  return (
    <Container>
      <Logo>MyWallet</Logo>
      <Form onSubmit={handleSubmit}>
        <Field
          placeholder="Nome"
          type="text"
          name="name"
          maxlength="20"
          onChange={(e) => setName(e.target.value)}
        />
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
        <Field
          placeholder="Confirme a senha"
          type="password"
          name="password"
          onChange={(e) => setRepeatPass(e.target.value)}
        />

        {loading && (
          <Loading>
            <ReactLoading type={"bubbles"} color={colors.font} width={"20%"} />
          </Loading>
        )}
        {!loading && <Submit type="submit" value="Cadastrar" />}
      </Form>
      <Link to={`/login`}>
        <Login>Já tem uma conta? Entre agora!</Login>
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
  font-family: "Saira Stencil One", cursive;
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

const Login = styled.p`
  font-size: 15px;
  font-weight: 700;
`;
