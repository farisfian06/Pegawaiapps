import { createRoot } from "react-dom/client";
import "./style.css";
import { ToastContainer } from "react-toastify";
import Routes from "./route/Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Routes />
    </QueryClientProvider>
  </>
);
