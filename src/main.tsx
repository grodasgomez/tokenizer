import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@/components/theme-provider";
import Tokenizer from "@/dictionary/ui";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Tokenizer />
    </ThemeProvider>
  </React.StrictMode>
);
