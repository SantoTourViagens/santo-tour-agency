
import { useFormContext } from "react-hook-form";
import { ViagemFormValues } from "@/components/viagens/types";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/masks";

interface PasseiosSectionProps {
  calculatedValues?: {
    totaldespesaspasseios?: number;
  };
}

export const PasseiosSection = ({ calculatedValues }: PasseiosSectionProps) => {
  const defaultValues = {
    totaldespesaspasseios: 0
  };

  const { totaldespesaspasseios = 0 } = calculatedValues || defaultValues;

  const { control } = useFormContext<ViagemFormValues>();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Passeios</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Passeio 1 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            control={control}
            name="qtdepasseios1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qtde Passeio 1</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="1" />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="valorpasseios1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passeio 1 R$</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="0.01" />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="descricaopasseios1"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Descrição Passeio 1</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Passeio 2 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            control={control}
            name="qtdepasseios2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qtde Passeio 2</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="1" />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="valorpasseios2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passeio 2 R$</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="0.01" />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="descricaopasseios2"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Descrição Passeio 2</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Passeio 3 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            control={control}
            name="qtdepasseios3"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qtde Passeio 3</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="1" />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="valorpasseios3"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passeio 3 R$</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="0.01" />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="descricaopasseios3"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Descrição Passeio 3</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Total e Observação */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <FormLabel>Total Passeios R$</FormLabel>
            <div className="h-10 flex items-center px-3 rounded-md border bg-gray-50">
              {formatCurrency(totaldespesaspasseios)}
            </div>
          </div>

          <FormField
            control={control}
            name="passeiosobservacao"
            render={({ field }) => (
              <FormItem className="md:col-span-3">
                <FormLabel>Observação Passeios</FormLabel>
                <FormControl>
                  <Input 
                    value={field.value ?? ''}
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
