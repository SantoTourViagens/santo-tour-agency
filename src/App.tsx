
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import ClientesForm from "./pages/forms/ClientesForm";
import ViagensForm from "./pages/forms/ViagensForm";
import PassageirosForm from "./pages/forms/PassageirosForm";
import AdiantamentosForm from "./pages/forms/AdiantamentosForm";
import RelatorioPagina from "./pages/RelatorioPagina";
import PedidoAcesso from "./pages/PedidoAcesso";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import { ThemeProvider } from "next-themes";

// Create a new instance of QueryClient with proper configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Index />
    },
    {
      path: "/dashboard",
      element: <Dashboard />
    },
    {
      path: "/form/clientes",
      element: <ClientesForm />
    },
    {
      path: "/form/viagens",
      element: <ViagensForm />
    },
    {
      path: "/form/passageiros",
      element: <PassageirosForm />
    },
    {
      path: "/form/adiantamentos",
      element: <AdiantamentosForm />
    },
    {
      path: "/relatorios",
      element: <RelatorioPagina />
    },
    {
      path: "/acesso",
      element: <PedidoAcesso />
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/logout",
      element: <LogoutPage />
    },
    {
      path: "*",
      element: <NotFound />
    }
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider router={router} />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
