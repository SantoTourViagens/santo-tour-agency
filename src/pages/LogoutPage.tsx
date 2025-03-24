
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const LogoutPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // When authentication is implemented, this will handle the logout process
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 flex items-center justify-center min-h-[calc(100vh-150px)]">
        <Alert className="max-w-md">
          <Info className="h-4 w-4" />
          <AlertTitle className="font-inter">Logout</AlertTitle>
          <AlertDescription className="font-roboto">
            A funcionalidade de logout estará disponível quando a autenticação for implementada. 
            Você será redirecionado para a página inicial em alguns segundos.
          </AlertDescription>
        </Alert>
      </div>
    </Layout>
  );
};

export default LogoutPage;
