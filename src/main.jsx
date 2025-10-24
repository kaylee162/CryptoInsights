import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { LiveDataProvider } from "./hooks/useLiveData.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LiveDataProvider>
      <App />
    </LiveDataProvider>
  </React.StrictMode>
);
