
import { useFormContext } from "react-hook-form";
import { ViagemFormValues } from "@/components/viagens/types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Portal } from "@radix-ui/react-portal";
import { formatCurrency, maskPhone } from "@/utils/masks";

interface TransporteSectionProps {
  calculatedValues?: {
    totaldespesastransporte?: number;
    qtdeassentos?: number;
    qtdereservadosguias?: number;
    qtdepromocionais?: number;
    qtdenaopagantes?: number;
    qtdepagantes?: number;
  };
}

export const TransporteSection = ({ calculatedValues }: TransporteSectionProps) => {
  const defaultValues = {
    totaldespesastransporte: 0,
    qtdeassentos: 0,
    qtdereservadosguias: 0,
    qtdepromocionais: 0,
    qtdenaopagantes: 0,
    qtdepagantes: 0
  };

  const values = { ...defaultValues, ...calculatedValues };
  const { control } = useFormContext<ViagemFormValues>();

  return (
    <Card className="relative">
      <CardHeader className="relative z-10">
        <CardTitle className="text-lg">Transporte</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={control}
            name="empresatransporte"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Empresa de Transporte</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="contatoempresa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Contato</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="telefoneempresa"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter font-medium">Telefone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="(00) 00000-0000"
                    value={maskPhone(field.value)}
                    onChange={(e) => field.onChange(e.target.value)}
                    maxLength={15}
                    className="font-roboto"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={control}
            name="tipoveiculo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo Veículo</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <Portal>
                    <SelectContent>
                      <SelectItem value="Van">Van</SelectItem>
                      <SelectItem value="Ônibus">Ônibus</SelectItem>
                      <SelectItem value="Semi Leito">Semi Leito</SelectItem>
                      <SelectItem value="Microônibus">Microônibus</SelectItem>
                      <SelectItem value="Carro">Carro</SelectItem>
                    </SelectContent>
                  </Portal>
                </Select>
              </FormItem>
            )}
          />
          
          <div className="space-y-2">
            <FormLabel>Qtde Assentos</FormLabel>
            <div className="h-10 px-4 py-2 border rounded-md bg-gray-50">
              {values.qtdeassentos}
            </div>
          </div>
          
          <div className="space-y-2">
            <FormLabel>Reservado para Guias</FormLabel>
            <div className="h-10 px-4 py-2 border rounded-md bg-gray-50">
              {values.qtdereservadosguias}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <FormLabel>Assentos Promocionais</FormLabel>
            <div className="h-10 px-4 py-2 border rounded-md bg-gray-50">
              {values.qtdepromocionais}
            </div>
          </div>
          
          <div className="space-y-2">
            <FormLabel>Não Pagantes</FormLabel>
            <div className="h-10 px-4 py-2 border rounded-md bg-gray-50">
              {values.qtdenaopagantes}
            </div>
          </div>
          
          <div className="space-y-2">
            <FormLabel>Pagantes</FormLabel>
            <div className="h-10 px-4 py-2 border rounded-md bg-gray-50 font-bold">
              {values.qtdepagantes}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={control}
            name="frete"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frete R$</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="0.01" />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>Total Transporte R$</FormLabel>
            <div className="h-10 flex items-center px-3 rounded-md border bg-gray-50">
              {formatCurrency(values.totaldespesastransporte)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
