import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/core";
import { BrowserRouter } from "react-router-dom";
import Menu from './screens/Customer/App/Menu';
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const customTheme = extendTheme({ colors });

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
