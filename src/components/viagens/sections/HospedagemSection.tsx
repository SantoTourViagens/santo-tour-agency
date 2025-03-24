
import { useFormContext } from "react-hook-form";
import { ViagemFormValues } from "@/components/viagens/types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Portal } from "@radix-ui/react-portal";
import { formatCurrency, maskPhone } from "@/utils/masks";
import { useEffect, useRef } from "react";

interface HospedagemSectionProps {
  calculatedValues: {
    totaldespesashospedagem?: number;
    qtdehospedes?: number;
    totaldiarias?: number;
    qtdediarias?: number;
  };
}

export const HospedagemSection = ({ calculatedValues }: HospedagemSectionProps) => {
  const { control, watch } = useFormContext<ViagemFormValues>();
  const watchedValues = watch();
  
  // Use a ref to track previous values to avoid excessive logging
  const prevValuesRef = useRef(calculatedValues);
  
  useEffect(() => {
    // Only log when values change
    if (JSON.stringify(prevValuesRef.current) !== JSON.stringify(calculatedValues)) {
      console.log('HospedagemSection calculatedValues changed:', calculatedValues);
      prevValuesRef.current = calculatedValues;
    }
  }, [calculatedValues]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Hospedagem</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            control={control}
            name="tipohospedagem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo Hospedagem</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <Portal>
                    <SelectContent>
                      <SelectItem value="Hostel">Hostel</SelectItem>
                      <SelectItem value="Pousada">Pousada</SelectItem>
                      <SelectItem value="Hotel">Hotel</SelectItem>
                      <SelectItem value="Casa">Casa</SelectItem>
                      <SelectItem value="Chácara">Chácara</SelectItem>
                    </SelectContent>
                  </Portal>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="nomehospedagem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Hospedagem</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} value={field.value ?? ""} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="contatohospedagem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Contato</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} value={field.value ?? ""} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="telefonehospedagem"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter font-medium">Telefone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="(00) 00000-0000"
                    value={maskPhone(field.value || '')}
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
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            control={control}
            name="regimehospedagem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Regime Hospedagem</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <Portal>
                    <SelectContent>
                      <SelectItem value="Pernoite">Pernoite</SelectItem>
                      <SelectItem value="Café da Manhã">Café da Manhã</SelectItem>
                      <SelectItem value="Meia Pensão">Meia Pensão</SelectItem>
                      <SelectItem value="Pensão Completa">Pensão Completa</SelectItem>
                    </SelectContent>
                  </Portal>
                </Select>
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <FormLabel>Qtde Diárias</FormLabel>
            <div className="h-10 flex items-center px-3 rounded-md border bg-gray-50">
              {calculatedValues.qtdediarias ?? 0}
            </div>
          </div>
          <FormField
            control={control}
            name="valordiariaunitario"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor Diária Unitário R$</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="0.01" value={field.value ?? 0} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="qtdehospedes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qtde de Hóspedes</FormLabel>
                <FormControl>
                  <div className="h-10 flex items-center px-3 rounded-md border bg-gray-50">
                    {calculatedValues.qtdehospedes ?? 0}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <FormLabel>Total das Diárias R$</FormLabel>
            <div className="h-10 flex items-center px-3 rounded-md border bg-gray-50">
              {formatCurrency(calculatedValues.totaldiarias ?? 0)}
            </div>
          </div>
          <FormField
            control={control}
            name="outrosservicosvalor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Outros Serviços R$</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="0.01" value={field.value ?? 0} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="outrosservicosdescricao"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Descrição Outros Serviços</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} value={field.value ?? ""} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <FormLabel>Total Hospedagem R$</FormLabel>
            <div className="h-10 flex items-center px-3 rounded-md border bg-gray-50">
              {formatCurrency(calculatedValues.totaldespesashospedagem ?? 0)}
            </div>
          </div>

          <FormField
            control={control}
            name="hospedagemobservacao"
            render={({ field }) => (
              <FormItem className="md:col-span-3">
                <FormLabel>Observação Hospedagem</FormLabel>
                <FormControl>
                  <Input 
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    maxLength={100}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};
