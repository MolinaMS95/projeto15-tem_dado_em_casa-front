import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import { createGlobalStyle } from "styled-components";
import { colors } from "./constants/colors";
import CheckoutPage from "./pages/CheckoutPage";

export const UserContext = createContext();

export default function App() {
  const [userData, setUserData] = useState(null);

  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={{ userData, setUserData }}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage set={setUserData} />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/" element={<HomePage set={setUserData} />} />
            <Route path="/cart" element={<CartPage set={setUserData} />} />
            <Route
              path="/checkout"
              element={<CheckoutPage set={setUserData} />}
            />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  *{
    color: ${colors.font};
    box-sizing: border-box;
    text-decoration: none;
  }
  body{
    background-color: ${colors.background};
    font-family: "Roboto", sans-serif;
  }
`;
