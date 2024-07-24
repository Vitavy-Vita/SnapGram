import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import QueryProvider from "./lib/react-query/QueryProvider";
import { Toaster } from "./components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryProvider>
      <AuthProvider>
        <App />
        <Toaster />
      </AuthProvider>
    </QueryProvider>
  </BrowserRouter>
);
