
import { useFormContext } from "react-hook-form";
import { ViagemFormValues } from "@/components/viagens/types";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/masks";
import { NumericInput } from "@/components/ui/numeric-input";

interface BrindesExtrasSectionProps {
  calculatedValues?: {
    brindestotal?: number;
    totaldespesasbrindeesextras?: number;
  };
}

export const BrindesExtrasSection = ({ calculatedValues }: BrindesExtrasSectionProps) => {
  const defaultValues = {
    brindestotal: 0,
    totaldespesasbrindeesextras: 0
  };

  const values = { ...defaultValues, ...calculatedValues };
  const { control } = useFormContext<ViagemFormValues>();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Brindes e Extras</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Seção de Brindes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            control={control}
            name="qtdebrindes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qtde Brindes</FormLabel>
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
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="brindesunitario"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor Unit. Brinde R$</FormLabel>
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
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="brindesdescricao"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Descrição Brindes</FormLabel>
                <FormControl>
                  <Input 
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    maxLength={50} 
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Extras 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="extras1valor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Extras 1 R$</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="0.01" />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="extras1descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição Extras 1</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        {/* Extras 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="extras2valor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Extras 2 R$</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="0.01" />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="extras2descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição Extras 2</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        {/* Extras 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="extras3valor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Extras 3 R$</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="0.01" />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="extras3descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição Extras 3</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <FormLabel>Total Brindes e Extras R$</FormLabel>
            <div className="h-10 flex items-center px-3 rounded-md border bg-gray-50">
              {formatCurrency(values.totaldespesasbrindeesextras || 0)}
            </div>
          </div>

          <FormField
            control={control}
            name="brindeseextrasobservacao"
            render={({ field }) => (
              <FormItem className="md:col-span-3">
                <FormLabel>Observação Brindes e Extras</FormLabel>
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
