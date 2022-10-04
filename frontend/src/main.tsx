import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { extendTheme } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Roboto', sans-serif`
    
  },
  components: {
    Button: {
      baseStyle: {
        fontFamily: 'Inter'
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
