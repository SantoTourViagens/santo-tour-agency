import { useFormContext } from "react-hook-form";
import { ViagemFormValues } from "@/components/viagens/types";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/masks";
import { NumericInput } from "@/components/ui/numeric-input";

interface TrasladosSectionProps {
  calculatedValues?: {
    totaldespesastraslados?: number;
  };
}

export const TrasladosSection = ({ calculatedValues }: TrasladosSectionProps) => {
  const defaultValues = {
    totaldespesastraslados: 0,
  };

  const { totaldespesastraslados = 0 } = calculatedValues || defaultValues;

  const { control } = useFormContext<ViagemFormValues>();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Traslados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Traslado 1 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            control={control}
            name="qtdetraslado1"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="qtdetraslado1">Qtde Traslado 1</FormLabel>
                <FormControl>
                  <NumericInput
                    {...field}
                    id="qtdetraslado1"
                    integer
                    min={0}
                    value={field.value ?? 0}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="traslado1valor"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="traslado1valor">Traslado 1 R$</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="traslado1valor"
                    type="number"
                    min="0"
                    step="0.01"
                    value={field.value ?? 0}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="traslado1descricao"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel htmlFor="traslado1descricao">Descrição Traslado 1</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="traslado1descricao"
                    maxLength={50} // Alinhado com o schema
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Traslado 2 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            control={control}
            name="qtdetraslado2"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="qtdetraslado2">Qtde Traslado 2</FormLabel>
                <FormControl>
                  <NumericInput
                    {...field}
                    id="qtdetraslado2"
                    integer
                    min={0}
                    value={field.value ?? 0}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="traslado2valor"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="traslado2valor">Traslado 2 R$</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="traslado2valor"
                    type="number"
                    min="0"
                    step="0.01"
                    value={field.value ?? 0}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="traslado2descricao"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel htmlFor="traslado2descricao">Descrição Traslado 2</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="traslado2descricao"
                    maxLength={50} // Alinhado com o schema
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Traslado 3 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            control={control}
            name="qtdetraslado3"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="qtdetraslado3">Qtde Traslado 3</FormLabel>
                <FormControl>
                  <NumericInput
                    {...field}
                    id="qtdetraslado3"
                    integer
                    min={0}
                    value={field.value ?? 0}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="traslado3valor"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="traslado3valor">Traslado 3 R$</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="traslado3valor"
                    type="number"
                    min="0"
                    step="0.01"
                    value={field.value ?? 0}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="traslado3descricao"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel htmlFor="traslado3descricao">Descrição Traslado 3</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="traslado3descricao"
                    maxLength={50} // Alinhado com o schema
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Total Traslados */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <FormLabel>Total Traslados R$</FormLabel>
            <div className="h-10 flex items-center px-3 rounded-md border bg-gray-50">
              {formatCurrency(totaldespesastraslados)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};