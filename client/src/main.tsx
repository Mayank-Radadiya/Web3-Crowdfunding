import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider clientId={import.meta.env.VITE_THIRDWEB_CLIENT_ID}>
        <Router>
          <Toaster />
          <App />
        </Router>
      </ThirdwebProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
