
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { LayoutDashboard, FileText, PieChart } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          <div className="w-full max-w-4xl text-center space-y-8">
            <div className="flex justify-center items-center w-full mb-6">
                <img src="/logo2.png" alt="logo santo tour" className="max-w-[300px]" />
              </div>
            <h2 className="text-4xl font-bold tracking-tight font-inter">
              Bem-vindo ao App Santo Tour
            </h2>
            <p className="text-xl text-muted-foreground font-roboto max-w-xl mx-auto">
              Sistema de gerenciamento de excursões da Santo Tour Viagens.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button asChild size="lg" className="bg-navy hover:bg-navy/90">
                <Link to="/dashboard" className="flex items-center gap-2">
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline">
                <Link to="/relatorios" className="flex items-center gap-2">
                  <PieChart size={20} />
                  <span>Relatórios</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
