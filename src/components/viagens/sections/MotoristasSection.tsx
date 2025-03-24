
import { useFormContext } from "react-hook-form";
import { ViagemFormValues } from "@/components/viagens/types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NumericInput } from "@/components/ui/numeric-input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/masks";

interface MotoristasSectionProps {
  calculatedValues: {
    totalrefeicaomotorista?: number;
    totaldeslocamentosmotoristas?: number;
    totaldespesasmotoristas?: number;
  };
}

export const MotoristasSection = ({ calculatedValues }: MotoristasSectionProps) => {
  const { control } = useFormContext<ViagemFormValues>();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Motoristas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            control={control}
            name="qtdemotoristas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qtde Motoristas</FormLabel>
                <FormControl>
                  <NumericInput 
                    value={field.value ?? 1}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    integer
                    min={0}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="qtdealmocosmotoristas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qtde Almoços</FormLabel>
                <FormControl>
                  <NumericInput 
                    value={field.value ?? 0}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    integer
                    min={0}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="qtdejantasmotoristas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qtde Jantas</FormLabel>
                <FormControl>
                  <NumericInput 
                    value={field.value ?? 0}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    integer
                    min={0}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="refeicaomotoristaunitario"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor Unit.  R$</FormLabel>
                <FormControl>
                  <Input 
                    value={field.value ?? 30}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    type="number" 
                    min="0" 
                    step="0.01" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="space-y-2">
            <FormLabel>Total Refeições R$</FormLabel>
            <div className="h-10 flex items-center px-3 rounded-md border bg-gray-50">
              {formatCurrency(calculatedValues.totalrefeicaomotorista || 0)}
            </div>
          </div>

          <FormField
            control={control}
            name="qtdedeslocamentosmotoristas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qtde Deslocamentos</FormLabel>
                <FormControl>
                  <NumericInput 
                    value={field.value ?? 0}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    integer
                    min={0}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="deslocamentomotoristaunitario"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor Unit. Deslocamento R$</FormLabel>
                <FormControl>
                  <Input 
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    type="number" 
                    min="0" 
                    step="0.01" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>Total Deslocamentos R$</FormLabel>
            <div className="h-10 flex items-center px-3 rounded-md border bg-gray-50">
              {formatCurrency(calculatedValues.totaldeslocamentosmotoristas || 0)}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <FormLabel>Total Despesas Motoristas R$</FormLabel>
            <div className="h-10 flex items-center px-3 rounded-md border bg-gray-50">
              {formatCurrency(calculatedValues.totaldespesasmotoristas || 0)}
            </div>
          </div>

          <FormField
            control={control}
            name="motoristasobservacao"
            render={({ field }) => (
              <FormItem className="md:col-span-3">
                <FormLabel>Observação Motoristas</FormLabel>
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
