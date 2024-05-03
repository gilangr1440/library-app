import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.tsx";
import "./index.css";
import { AuthProvider } from "./utils/contexts/auth.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
