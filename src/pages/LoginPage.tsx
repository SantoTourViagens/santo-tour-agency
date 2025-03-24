
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 flex items-center justify-center min-h-[calc(100vh-150px)]">
        <Card className="max-w-md w-full">
          <CardHeader className="bg-navy text-white">
            <CardTitle className="text-xl font-inter">Login</CardTitle>
            <CardDescription className="text-gray-200 font-roboto">
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-inter font-medium">Email</Label>
              <Input id="email" type="email" placeholder="seu.email@exemplo.com" className="font-roboto" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="font-inter font-medium">Senha</Label>
              <Input id="password" type="password" placeholder="********" className="font-roboto" />
            </div>
            
            <Button className="w-full bg-navy hover:bg-navy/90 font-inter mt-4">
              Entrar
            </Button>
            
            <p className="text-center text-sm text-muted-foreground font-roboto mt-4">
              Esta funcionalidade estará disponível em breve. <br />
              Solicite acesso através da página "Solicitar Acesso".
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default LoginPage;
