
import { useFormContext } from "react-hook-form";
import { ViagemFormValues } from "@/components/viagens/types";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/masks";

interface TaxasSectionProps {
  calculatedValues?: {
    totaldespesastaxas?: number;
  };
}

export const TaxasSection = ({ calculatedValues }: TaxasSectionProps) => {
  const defaultValues = {
    totaldespesastaxas: 0
  };

  const { totaldespesastaxas = 0 } = calculatedValues || defaultValues;

  const { control } = useFormContext<ViagemFormValues>();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Taxas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            control={control}
            name="taxacidade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Taxa da Cidade R$</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="0.01" />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="taxaguialocal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Taxa do Guia R$</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="0.01" />
                </FormControl>
              </FormItem>
            )}
          />
   
          <FormField
            control={control}
            name="outrastaxasvalor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Outras Taxas R$</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="0.01" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="estacionamento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estacionamento R$</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="0.01" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>          

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <FormLabel>Total R$</FormLabel>
            <div className="h-10 flex items-center px-3 rounded-md border bg-gray-50">
              <span className="font-bold">{formatCurrency(totaldespesastaxas)}</span>
            </div>
          </div>

          <FormField
            control={control}
            name="outrastaxasdescricao"
            render={({ field }) => (
              <FormItem className="md:col-span-3">
                <FormLabel>Observação</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={100} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};
