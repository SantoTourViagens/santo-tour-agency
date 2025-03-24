
import { useFormContext } from "react-hook-form";
import { ViagemFormValues } from "@/components/viagens/types";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/masks";

interface OutrasReceitasSectionProps {
  calculatedValues?: {
    totaloutrasreceitas?: number;
  };
}

export const OutrasReceitasSection = ({ calculatedValues }: OutrasReceitasSectionProps) => {
  const defaultValues = {
    totaloutrasreceitas: 0
  };

  const { totaloutrasreceitas = 0 } = calculatedValues || defaultValues;

  const { control } = useFormContext<ViagemFormValues>();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Outras Receitas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Receita 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="outrasreceitas1valor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor Receita 1 R$</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="0.01" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="outrasreceitas1descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição Receita 1</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Receita 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="outrasreceitas2valor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor Receita 2 R$</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="0.01" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="outrasreceitas2descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição Receita 2</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Receita 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="outrasreceitas3valor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor Receita 3</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="0.01" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="outrasreceitas3descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição Receita 3</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <FormLabel>Total Outras Receitas R$</FormLabel>
            <div className="h-10 flex items-center px-3 rounded-md border bg-gray-50">
              {formatCurrency(totaloutrasreceitas)}
            </div>
          </div>

          <FormField
            control={control}
            name="outrasreceitasobservacao"
            render={({ field }) => (
              <FormItem className="md:col-span-3">
                <FormLabel>Observação Outras Receitas</FormLabel>
                <FormControl>
                  <Input 
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    maxLength={100}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};
