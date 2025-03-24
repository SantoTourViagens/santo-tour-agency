// pages\Dashboard.tsx
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FileText, PieChart, Users, Plane, LogIn, LogOut, UserPlus } from "lucide-react"

const Dashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        {/* Add auth links at the top */}
        <div className="flex justify-end gap-4 mb-6">
           <Link
            to="/acesso"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-navy"
          >
            <UserPlus size={16} />
            <span>Solicitar Acesso</span>
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6 font-inter text-black">Dashboard Santo Tour</h1>
        
        {/* Rest of the dashboard content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Clientes"
            description="Cadastro e gestão de clientes"
            icon={<Users className="h-8 w-8 text-navy" />}
            link="/form/clientes"
          />
          
          <DashboardCard
            title="Viagens"
            description="Cadastro e gestão de viagens"
            icon={<Plane className="h-8 w-8 text-navy" />}
            link="/form/viagens"
          />
          
          <DashboardCard
            title="Passageiros"
            description="Cadastro e gestão de passageiros"
            icon={<FileText className="h-8 w-8 text-navy" />}
            link="/form/passageiros"
          />
          
          <DashboardCard
            title="Adiantamentos"
            description="Cadastro e gestão de adiantamentos"
            icon={<FileText className="h-8 w-8 text-navy" />}
            link="/form/adiantamentos"
          />
          
          <DashboardCard
            title="Relatórios"
            description="Visualização de relatórios"
            icon={<PieChart className="h-8 w-8 text-navy" />}
            link="/relatorios"
          />
        </div>
      </div>
    </Layout>
  );
};

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const DashboardCard = ({ title, description, icon, link }: DashboardCardProps) => {
  return (
    <Link to={link}>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-inter">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground font-roboto">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Dashboard;
