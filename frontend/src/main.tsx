import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import AppRouterProvider from "./router/Router";
import { Provider } from "react-redux";
import { store } from "@store/store";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  root.render(
    <StrictMode>
      <Provider store={store}>
        <AppRouterProvider />
      </Provider>
    </StrictMode>
  );
} else {
  throw new Error("Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.");
}
