
import { useFormContext } from "react-hook-form";
import { ViagemFormValues } from "@/components/viagens/types";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/masks";
import { useEffect, useState } from "react";
import { recalculateFinancialsWithCustomPrice } from "@/hooks/calculations/revenueCalculations";

interface ResultadosSectionProps {
  calculatedValues?: {
    despesatotal?: number;
    pontoequilibrio?: number;
    precosugerido?: number;
    receitatotal?: number;
    lucrobruto?: number;
    qtdepagantes?: number;
    totaloutrasreceitas?: number;
  };
}

export const ResultadosSection = ({ calculatedValues }: ResultadosSectionProps) => {
  const [hasManuallyEdited, setHasManuallyEdited] = useState(false);
  const [editedValue, setEditedValue] = useState<string>("");
  
  const defaultValues = {
    despesatotal: 0,
    pontoequilibrio: 0,
    precosugerido: 0,
    receitatotal: 0,
    lucrobruto: 0,
    qtdepagantes: 0,
    totaloutrasreceitas: 0
  };

  const values = { ...defaultValues, ...calculatedValues };
  const { control, setValue, getValues, watch } = useFormContext<ViagemFormValues>();
  
  // Monitorar apenas o preço sugerido para atualização
  const watchedPrecoSugerido = watch('precosugerido');
  
  // Atualizar o valor editado quando o preço sugerido mudar e não estiver sendo editado manualmente
  useEffect(() => {
    if (!hasManuallyEdited && calculatedValues?.precosugerido && calculatedValues.precosugerido > 0) {
      const formattedValue = calculatedValues.precosugerido.toFixed(2);
      setEditedValue(formattedValue);
    }
  }, [calculatedValues, hasManuallyEdited]);

  // Monitorar mudanças no watchedPrecoSugerido para recalcular financeiros
  useEffect(() => {
    if (hasManuallyEdited && watchedPrecoSugerido) {
      recalculateFinancials(watchedPrecoSugerido);
    }
  }, [watchedPrecoSugerido]);

  // Function to recalculate financials when price is manually edited
  const recalculateFinancials = (newPrice: number) => {
    const qtdePagantes = values.qtdepagantes || 0;
    const despesaTotal = values.despesatotal || 0;
    const outrasReceitas = values.totaloutrasreceitas || 0;
    
    console.log("Iniciando recálculo com:", {
      preço: newPrice,
      qtdePagantes,
      despesaTotal,
      outrasReceitas
    });
    
    // Calculate new financial values
    const { receitatotal, lucrobruto } = recalculateFinancialsWithCustomPrice(
      newPrice,
      qtdePagantes,
      despesaTotal,
      outrasReceitas
    );
    
    console.log("Resultados do recálculo:", {
      receitatotal,
      lucrobruto,
      precosugerido: newPrice
    });
    
    // Update form values with explicit notification
    setValue('receitatotal', receitatotal, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
    
    setValue('lucrobruto', lucrobruto, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
    
    console.log("Valores após atualização:", {
      receitatotal: getValues('receitatotal'),
      lucrobruto: getValues('lucrobruto'),
      precosugerido: getValues('precosugerido')
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Resultados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <FormLabel>Qtde Pagantes</FormLabel>
            <div className="h-10 flex items-center px-3 rounded-md border bg-gray-50">
              {values.qtdepagantes || 0}
            </div>
          </div>

          <div className="space-y-2">
            <FormLabel>Ponto de Equilíbrio</FormLabel>
            <div className="h-10 flex items-center px-3 rounded-md border bg-gray-50">
              {formatCurrency(values.pontoequilibrio || 0)}
            </div>
          </div>

          <FormField
            control={control}
            name="precosugerido"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço Sugerido</FormLabel>
                <FormControl>
                  <Input
                    isCurrency
                    value={editedValue || (field.value > 0 ? field.value.toFixed(2) : "0.00")}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^0-9.,]/g, '');
                      setEditedValue(numericValue);
                      setHasManuallyEdited(true);
                    }}
                    onBlur={() => {
                      // Convert the edited value to a number and update the field
                      let numericValue = 0;
                      try {
                        // Handle input with comma or period
                        const cleanValue = editedValue.replace(',', '.');
                        numericValue = parseFloat(cleanValue) || 0;
                      } catch (error) {
                        numericValue = 0;
                      }
                      
                      console.log('Preço sugerido após edição manual:', numericValue);
                      
                      // Update the suggested price field and trigger recalculation
                      field.onChange(numericValue);
                      setEditedValue(numericValue.toFixed(2));
                      
                      // Important: Force immediate field update in the form
                      setValue('precosugerido', numericValue, { 
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true 
                      });
                      
                      // Recalculate financials immediately after price update
                      recalculateFinancials(numericValue);
                    }}
                    className="text-right font-bold text-green-600"
                    placeholder="0.00"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="receitatotal"
            render={() => (
              <FormItem>
                <FormLabel>Receita Total</FormLabel>
                <div className="h-10 flex items-center px-3 rounded-md border bg-gray-50 font-bold">
                  {formatCurrency(getValues('receitatotal') || 0)}
                </div>
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>Despesa Total</FormLabel>
            <div className="h-10 flex items-center px-3 rounded-md border bg-gray-50">
              {formatCurrency(values.despesatotal || 0)}
            </div>
          </div>

          <FormField
            control={control}
            name="lucrobruto"
            render={() => (
              <FormItem>
                <FormLabel>Lucro Bruto</FormLabel>
                <div className="h-10 flex items-center px-3 rounded-md border bg-gray-50 font-bold text-green-600">
                  {formatCurrency(getValues('lucrobruto') || 0)}
                </div>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};
