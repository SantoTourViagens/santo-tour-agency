import { useFormContext } from "react-hook-form";
import { ViagemFormValues } from "@/components/viagens/types";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect } from "react";

export const GeneralInfoSection = () => {
  const { control, watch, setValue } = useFormContext<ViagemFormValues>();

  // Monitora a data de partida
  const departureDate = watch("datapartida");

  // Atualiza a data de retorno automaticamente quando a data de partida muda
  useEffect(() => {
    if (departureDate && !watch("dataretorno")) {
      setValue("dataretorno", addDays(departureDate, 1));
    }
  }, [departureDate, setValue]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Informações Gerais</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            control={control}
            name="destino"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destino</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="cidadesvisitar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidades a Visitar</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="datapartida"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data Partida</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className="w-full pl-3 text-left font-normal"
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        if (date) {
                          field.onChange(date);
                          setValue("dataretorno", addDays(date, 1));
                          const event = new CustomEvent('popover-close');
                          window.dispatchEvent(event);
                        }
                      }}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      locale={ptBR}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="dataretorno"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data Retorno</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className="w-full pl-3 text-left font-normal"
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        if (date) {
                          field.onChange(date);
                          const event = new CustomEvent('popover-close');
                          window.dispatchEvent(event);
                        }
                      }}
                      defaultMonth={departureDate}
                      disabled={(date) => date < departureDate}
                      locale={ptBR}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};