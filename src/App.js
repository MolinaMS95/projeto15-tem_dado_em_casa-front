import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import { createGlobalStyle } from "styled-components";
import { colors } from "./constants/colors";

export const UserContext = createContext();

export default function App() {
  const [userData, setUserData] = useState(0);
  console.log(userData);

  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={userData}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage set={setUserData} />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage set={setUserData} />} />
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
