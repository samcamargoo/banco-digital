import { MainPage } from "./components/MainPage";
import { Navbar } from "./components/Navbar";
import "@fontsource/inter/700.css";
import { Footer } from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Cadastro } from "./components/Cadastro";
import { Flex } from "@chakra-ui/react";

function App() {
  return (
    <>
    <Flex justifyContent="space-between" flexDir="column" height="100vh">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/criar-conta" element={<Cadastro />} />
        </Route>
      </Routes>
    <Footer />
      </Flex>
      
    </>
  );
}

export default App;
