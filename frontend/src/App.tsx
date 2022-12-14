import { MainPage } from "./components/MainPage";
import { Navbar } from "./components/Navbar";
import "@fontsource/inter/700.css";
import "@fontsource/roboto/400.css";
import { Footer } from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Cadastro } from "./components/Cadastro";
import { Dashboard } from "./components/Dashboard";
import { Flex } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthProvider";
import { RequireAuth } from "./components/RequireAuth";
import { PagarBoleto } from "./components/PagarBoleto";
import { GerarBoleto } from "./components/GerarBoleto";
import { Transferencia } from "./components/Transferencia";

function App() {
  return (
    <>
      <Flex flexDir="column">
        <Navbar />

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/criar-conta" element={<Cadastro />} />

            <Route element={<RequireAuth />}>
              <Route path="/conta" element={<Dashboard />} />
              <Route path="conta/pagar-boleto" element={<PagarBoleto />} />
              <Route path="conta/gerar-boleto" element={<GerarBoleto />} />
              <Route path="conta/transferencia" element={<Transferencia />} />
            </Route>
          </Route>
        </Routes>

        <Footer />
      </Flex>

      <ToastContainer />
    </>
  );
}

export default App;
