
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RelatorioPagina = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6 font-inter">Relatórios</h1>
        
        <Card>
          <CardHeader className="bg-navy text-white">
            <CardTitle className="text-xl font-inter">Página de Relatórios</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-muted-foreground font-roboto">
              Esta página será implementada em breve com relatórios detalhados sobre clientes, 
              viagens, passageiros e adiantamentos.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default RelatorioPagina;
