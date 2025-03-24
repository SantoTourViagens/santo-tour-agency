
import { useFormContext } from "react-hook-form";
import { ViagemFormValues } from "@/components/viagens/types";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/masks";

interface SorteiosSectionProps {
  calculatedValues?: {
    totaldespesassorteios?: number;
  };
}

export const SorteiosSection = ({ calculatedValues }: SorteiosSectionProps) => {
  const defaultValues = {
    totaldespesassorteios: 0
  };

  const { totaldespesassorteios = 0 } = calculatedValues || defaultValues;

  const { control } = useFormContext<ViagemFormValues>();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Sorteios</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Sorteio 1 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            control={control}
            name="sorteio1qtde"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qtde Sorteio 1</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="1" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="sorteio1valor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sorteio 1 R$ Unit.</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="0.01" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="sorteio1descricao"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Descrição Sorteio 1</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Sorteio 2 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            control={control}
            name="sorteio2qtde"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qtde Sorteio 2</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="1" />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="sorteio2valor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sorteio 2 Unit. R$</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="0.01" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="sorteio2descricao"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Descrição Sorteio 2</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Sorteio 3 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            control={control}
            name="sorteio3qtde"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qtde Sorteio 3</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="1" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="sorteio3valor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sorteio 3 Unit. R$</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="0.01" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="sorteio3descricao"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Descrição Sorteio 3</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Total Sorteios */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <FormLabel>Total Sorteios R$</FormLabel>
            <div className="h-10 flex items-center px-3 rounded-md border bg-gray-50">
              {formatCurrency(totaldespesassorteios)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
