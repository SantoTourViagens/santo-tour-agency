
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  PieChart, 
  LogIn, 
  LogOut, 
  UserPlus,
  Users,
  Plane 
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  return (
    <header className="w-full bg-navy shadow-md">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl font-inter">App Santo Tour</Link>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <NavLink to="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
            <NavLink to="/form/clientes" icon={<Users size={18} />} label="Clientes" />
            <NavLink to="/form/viagens" icon={<Plane size={18} />} label="Viagens" />
            <NavLink to="/form/passageiros" icon={<FileText size={18} />} label="Passageiros" />
            <NavLink to="/form/adiantamentos" icon={<FileText size={18} />} label="Adiantamentos" />
            <NavLink to="/relatorios" icon={<PieChart size={18} />} label="Relatórios" />
            <NavLink to="/login" icon={<LogIn size={18} />} label="Login" />
            <NavLink to="/logout" icon={<LogOut size={18} />} label="Logout" />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
};

const NavLink = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => {
  return (
    <Link 
      to={to} 
      className="flex items-center gap-2 text-white hover:text-gray-200 font-inter text-sm py-1 px-2 rounded-md"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Navbar;
