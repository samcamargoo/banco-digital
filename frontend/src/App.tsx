import { MainPage } from "./components/MainPage";
import { Navbar } from "./components/Navbar";
import "@fontsource/inter/700.css";
import { Footer } from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Cadastro } from "./components/Cadastro";
import { Flex } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Flex minHeight="100vh" flexDir="column" justifyContent="space-between">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/criar-conta" element={<Cadastro />} />
          </Route>
        </Routes>
        <Footer />
      </Flex>
      <ToastContainer />
    </>
  );
}

export default App;
