
import { useEffect } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import { usePassageiroForm } from "@/hooks/passageiros/usePassageiroForm";
import PassageiroPersonalInfoSection from "@/components/passageiros/PassageiroPersonalInfoSection";
import PassageiroPaymentSection from "@/components/passageiros/PassageiroPaymentSection";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const PassageirosForm = () => {
  const {
    form,
    listaViagens,
    activeTab,
    isPassageiroLoaded,
    setActiveTab,
    handleViagemChange,
    handleCPFChange,
    handlePagamentoAVistaChange,
    handleDeletePassageiro,
    onSubmit,
    fetchViagens
  } = usePassageiroForm();

  useEffect(() => {
    fetchViagens();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <Card className="w-full">
          <CardHeader className="bg-navy text-white">
            <CardTitle className="text-xl font-inter">Cadastro de Passageiros</CardTitle>
            <CardDescription className="text-gray-200 font-roboto">
              Preencha os dados do passageiro
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="dados-pessoais">Dados Pessoais</TabsTrigger>
                    <TabsTrigger value="pagamento">Pagamento</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="dados-pessoais" className="space-y-6">
                    <PassageiroPersonalInfoSection 
                      form={form}
                      listaViagens={listaViagens}
                      handleViagemChange={handleViagemChange}
                      handleCPFChange={handleCPFChange}
                    />
                  </TabsContent>
                  
                  <TabsContent value="pagamento" className="space-y-6">
                    <PassageiroPaymentSection
                      form={form}
                      handlePagamentoAVistaChange={handlePagamentoAVistaChange}
                    />
                  </TabsContent>
                </Tabs>
                
                <div className="flex justify-between items-center mt-6">
                  <Button type="submit" className="flex-1">
                    {isPassageiroLoaded ? "Atualizar Passageiro" : "Cadastrar Passageiro"}
                  </Button>
                  
                  {isPassageiroLoaded && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" type="button" className="ml-4">
                          <Trash className="h-4 w-4 mr-2" />
                          Excluir Passageiro
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir este passageiro? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeletePassageiro}>
                            Confirmar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PassageirosForm;
