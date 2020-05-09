import plusnew from "@plusnew/core";
import App from "./App";
import Providers from "Providers";
import driver from "@plusnew/driver-dom";

plusnew.render(
  <Providers>
    <App />
  </Providers>,
  {
    driver: driver(document.body),
  }
);
