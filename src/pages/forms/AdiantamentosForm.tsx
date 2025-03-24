import { useState, useEffect, useCallback } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField, // Adding the missing import
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency, formatDateForDB, formatDateForDisplay } from "@/utils/masks";
import { MaskedInput } from "@/components/ui/masked-input";

// Define the form schema with Zod
const formSchema = z.object({
  viagemId: z.string().min(1, { message: "Viagem é obrigatória" }),
  // Taxas
  adianttaxaspara: z.string().max(50).optional(),
  adianttaxasvalor: z.number().min(0).default(0),
  valortaxastotal: z.number().min(0).default(0),
  restantetaxas: z.number().min(0).default(0),
  // Frete
  adiantfretepara: z.string().max(50).optional(),
  adiantfretevalor: z.number().min(0).default(0),
  valorfretetotal: z.number().min(0).default(0),
  restantefrete: z.number().min(0).default(0),
  // Estacionamento
  adiantestacionamentopara: z.string().max(50).optional(),
  adiantestacionamentovalor: z.number().min(0).default(0),
  valorestacionamentototal: z.number().min(0).default(0),
  restanteestacionamento: z.number().min(0).default(0),
  // Traslados
  adianttrasladospara: z.string().max(50).optional(),
  adianttrasladosvalor: z.number().min(0).default(0),
  valortrasladostotal: z.number().min(0).default(0),
  restantetraslados: z.number().min(0).default(0),
  // Hospedagem
  adianthospedagempara: z.string().max(50).optional(),
  adianthospedagemvalor: z.number().min(0).default(0),
  valorhospedagemtotal: z.number().min(0).default(0),
  restantehospedagem: z.number().min(0).default(0),
  // Passeios
  adiantpasseiospara: z.string().max(50).optional(),
  adiantpasseiosvalor: z.number().min(0).default(0),
  valorpasseiostotal: z.number().min(0).default(0),
  restantepasseios: z.number().min(0).default(0),
  // Brindes
  adiantbrindespara: z.string().max(50).optional(),
  adiantbrindesvalor: z.number().min(0).default(0),
  valorbrindestotal: z.number().min(0).default(0),
  restantebrindeseextras: z.number().min(0).default(0),
  // Totais
  totaldespesas: z.number().min(0).default(0),
  totaladiantamentos: z.number().min(0).default(0),
  restantetotal: z.number().min(0).default(0),
});

type FormValues = z.infer<typeof formSchema>;

interface Viagem {
  id: string;
  destino: string;
  datapartida: string;
  totaltaxas: number | null;
  frete: number | null;
  estacionamento: number | null;
  totaltraslados: number | null;
  totaldespesashospedagem: number | null;
  totaldespesaspasseios: number | null;
  totaldespesasbrindeesextras: number | null;
  despesatotal: number | null;
}

const AdiantamentosForm = () => {
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedViagem, setSelectedViagem] = useState<Viagem | null>(null);
  const [formKey, setFormKey] = useState(0); // Add a key to force re-render when needed

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adianttaxasvalor: 0,
      valortaxastotal: 0,
      restantetaxas: 0,
      adiantfretevalor: 0,
      valorfretetotal: 0,
      restantefrete: 0,
      adiantestacionamentovalor: 0,
      valorestacionamentototal: 0,
      restanteestacionamento: 0,
      adianttrasladosvalor: 0,
      valortrasladostotal: 0,
      restantetraslados: 0,
      adianthospedagemvalor: 0,
      valorhospedagemtotal: 0,
      restantehospedagem: 0,
      adiantpasseiosvalor: 0,
      valorpasseiostotal: 0,
      restantepasseios: 0,
      adiantbrindesvalor: 0,
      valorbrindestotal: 0,
      restantebrindeseextras: 0,
      totaldespesas: 0,
      totaladiantamentos: 0,
      restantetotal: 0,
    },
  });

  // Memoized function to update calculations
  const updateCalculations = useCallback(() => {
    if (!selectedViagem) return;

    // Get all the current form values
    const values = form.getValues();

    // Update each "restante" value
    const restanteTaxas = (selectedViagem.totaltaxas || 0) - values.adianttaxasvalor;
    const restanteFrete = (selectedViagem.frete || 0) - values.adiantfretevalor;
    const restanteEstacionamento = (selectedViagem.estacionamento || 0) - values.adiantestacionamentovalor;
    const restanteTraslados = (selectedViagem.totaltraslados || 0) - values.adianttrasladosvalor;
    const restanteHospedagem = (selectedViagem.totaldespesashospedagem || 0) - values.adianthospedagemvalor;
    const restantePasseios = (selectedViagem.totaldespesaspasseios || 0) - values.adiantpasseiosvalor;
    const restanteBrindes = (selectedViagem.totaldespesasbrindeesextras || 0) - values.adiantbrindesvalor;

    // Total adiantamentos
    const totalAdiantamentos = 
      values.adianttaxasvalor +
      values.adiantfretevalor +
      values.adiantestacionamentovalor +
      values.adianttrasladosvalor +
      values.adianthospedagemvalor +
      values.adiantpasseiosvalor +
      values.adiantbrindesvalor;

    // Total despesas from the viagem
    const totalDespesas = selectedViagem.despesatotal || 0;

    // Restante total
    const restanteTotal = totalDespesas - totalAdiantamentos;

    // Update the form without triggering re-renders in a loop
    form.setValue("restantetaxas", restanteTaxas, { shouldDirty: false });
    form.setValue("restantefrete", restanteFrete, { shouldDirty: false });
    form.setValue("restanteestacionamento", restanteEstacionamento, { shouldDirty: false });
    form.setValue("restantetraslados", restanteTraslados, { shouldDirty: false });
    form.setValue("restantehospedagem", restanteHospedagem, { shouldDirty: false });
    form.setValue("restantepasseios", restantePasseios, { shouldDirty: false });
    form.setValue("restantebrindeseextras", restanteBrindes, { shouldDirty: false });
    form.setValue("totaladiantamentos", totalAdiantamentos, { shouldDirty: false });
    form.setValue("totaldespesas", totalDespesas, { shouldDirty: false });
    form.setValue("restantetotal", restanteTotal, { shouldDirty: false });

  }, [selectedViagem, form]);

  // Fetch all viagens on component mount
  useEffect(() => {
    const fetchViagens = async () => {
      try {
        const { data, error } = await supabase
          .from("viagens")
          .select(`
            id, 
            destino, 
            datapartida,
            totaltaxas,
            frete,
            estacionamento,
            totaltraslados,
            totaldespesashospedagem,
            totaldespesaspasseios,
            totaldespesasbrindeesextras,
            despesatotal
          `);

        if (error) throw error;
        if (data) setViagens(data);
      } catch (error: any) {
        console.error("Error fetching viagens:", error.message);
        toast.error("Erro ao carregar viagens");
      }
    };

    fetchViagens();
  }, []);

  // Update calculations when values change - use a throttled approach
  useEffect(() => {
    // Use setTimeout to avoid too many consecutive updates
    const timerId = setTimeout(() => {
      updateCalculations();
    }, 100);

    return () => clearTimeout(timerId);
  }, [
    form.watch("adianttaxasvalor"),
    form.watch("adiantfretevalor"),
    form.watch("adiantestacionamentovalor"),
    form.watch("adianttrasladosvalor"),
    form.watch("adianthospedagemvalor"),
    form.watch("adiantpasseiosvalor"),
    form.watch("adiantbrindesvalor"),
    updateCalculations
  ]);

  // Handle viagem selection
  const handleViagemChange = (viagemId: string) => {
    const viagem = viagens.find(v => v.id === viagemId);
    if (viagem) {
      setSelectedViagem(viagem);
      
      // Set form values based on the selected viagem
      form.setValue("valortaxastotal", viagem.totaltaxas || 0);
      form.setValue("valorfretetotal", viagem.frete || 0);
      form.setValue("valorestacionamentototal", viagem.estacionamento || 0);
      form.setValue("valortrasladostotal", viagem.totaltraslados || 0);
      form.setValue("valorhospedagemtotal", viagem.totaldespesashospedagem || 0);
      form.setValue("valorpasseiostotal", viagem.totaldespesaspasseios || 0);
      form.setValue("valorbrindestotal", viagem.totaldespesasbrindeesextras || 0);
      form.setValue("totaldespesas", viagem.despesatotal || 0);
      
      // Reset adiantamentos values
      form.setValue("adianttaxasvalor", 0);
      form.setValue("adiantfretevalor", 0);
      form.setValue("adiantestacionamentovalor", 0);
      form.setValue("adianttrasladosvalor", 0);
      form.setValue("adianthospedagemvalor", 0);
      form.setValue("adiantpasseiosvalor", 0);
      form.setValue("adiantbrindesvalor", 0);
      
      // Calculate restante values
      form.setValue("restantetaxas", viagem.totaltaxas || 0);
      form.setValue("restantefrete", viagem.frete || 0);
      form.setValue("restanteestacionamento", viagem.estacionamento || 0);
      form.setValue("restantetraslados", viagem.totaltraslados || 0);
      form.setValue("restantehospedagem", viagem.totaldespesashospedagem || 0);
      form.setValue("restantepasseios", viagem.totaldespesaspasseios || 0);
      form.setValue("restantebrindeseextras", viagem.totaldespesasbrindeesextras || 0);
      form.setValue("totaladiantamentos", 0);
      form.setValue("restantetotal", viagem.despesatotal || 0);
      
      // Force re-render to ensure all values are applied
      setFormKey(prevKey => prevKey + 1);
    }
  };

  // Form submission handler
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("adiantamentos").insert({
        adianttaxaspara: values.adianttaxaspara || null,
        adianttaxasvalor: values.adianttaxasvalor,
        valortaxastotal: values.valortaxastotal,
        restantetaxas: values.restantetaxas,
        
        adiantfretepara: values.adiantfretepara || null,
        adiantfretevalor: values.adiantfretevalor,
        valorfretetotal: values.valorfretetotal,
        restantefrete: values.restantefrete,
        
        adiantestacionamentopara: values.adiantestacionamentopara || null,
        adiantestacionamentovalor: values.adiantestacionamentovalor,
        valorestacionamentototal: values.valorestacionamentototal,
        restanteestacionamento: values.restanteestacionamento,
        
        adianttrasladospara: values.adianttrasladospara || null,
        adianttrasladosvalor: values.adianttrasladosvalor,
        valortrasladostotal: values.valortrasladostotal,
        restantetraslados: values.restantetraslados,
        
        adianthospedagempara: values.adianthospedagempara || null,
        adianthospedagemvalor: values.adianthospedagemvalor,
        valorhospedagemtotal: values.valorhospedagemtotal,
        restantehospedagem: values.restantehospedagem,
        
        adiantpasseiospara: values.adiantpasseiospara || null,
        adiantpasseiosvalor: values.adiantpasseiosvalor,
        valorpasseiostotal: values.valorpasseiostotal,
        restantepasseios: values.restantepasseios,
        
        adiantbrindespara: values.adiantbrindespara || null,
        adiantbrindesvalor: values.adiantbrindesvalor,
        valorbrindestotal: values.valorbrindestotal,
        restantebrindeseextras: values.restantebrindeseextras,
        
        totaldespesas: values.totaldespesas,
        totaladiantamentos: values.totaladiantamentos,
        restantetotal: values.restantetotal,
      });

      if (error) throw error;

      toast.success("Adiantamento cadastrado com sucesso!");
      form.reset();
      setSelectedViagem(null);
      setFormKey(prevKey => prevKey + 1);
    } catch (error: any) {
      console.error("Error submitting form:", error.message);
      toast.error(`Erro ao cadastrar adiantamento: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Currency input component
  const CurrencyFormField = ({
    name,
    label,
    readOnly = false
  }: {
    name: keyof FormValues,
    label: string,
    readOnly?: boolean
  }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="text"
              isCurrency={true}
              className={cn("font-roboto", readOnly && "bg-gray-100")}
              readOnly={readOnly}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <Card className="w-full">
          <CardHeader className="bg-navy text-white">
            <CardTitle className="text-xl font-inter">Cadastro de Adiantamentos</CardTitle>
            <CardDescription className="text-gray-200 font-roboto">
              Registre os adiantamentos para cada categoria de despesa
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form key={formKey} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="mb-8">
                  <FormField
                    control={form.control}
                    name="viagemId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Viagem</FormLabel>
                        <Select 
                          onValueChange={(value) => {
                            field.onChange(value);
                            handleViagemChange(value);
                          }}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a viagem" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {viagens.map(viagem => (
                              <SelectItem key={viagem.id} value={viagem.id}>
                                {viagem.destino} - {new Date(viagem.datapartida).toLocaleDateString('pt-BR')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {selectedViagem && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Taxas */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-inter">Taxas</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name="adianttaxaspara"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Adiantamento de Taxas Para</FormLabel>
                              <FormControl>
                                <Input {...field} className="font-roboto" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <CurrencyFormField name="adianttaxasvalor" label="Valor do Adiantamento R$" />
                        <CurrencyFormField name="valortaxastotal" label="Total de Taxas R$" readOnly />
                        <CurrencyFormField name="restantetaxas" label="Valor Restante" readOnly />
                      </CardContent>
                    </Card>

                    {/* Frete */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-inter">Frete</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name="adiantfretepara"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Adiantamento de Frete Para</FormLabel>
                              <FormControl>
                                <Input {...field} className="font-roboto" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <CurrencyFormField name="adiantfretevalor" label="Valor do Adiantamento R$" />
                        <CurrencyFormField name="valorfretetotal" label="Total de Frete R$" readOnly />
                        <CurrencyFormField name="restantefrete" label="Valor Restante" readOnly />
                      </CardContent>
                    </Card>

                    {/* Estacionamento */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-inter">Estacionamento</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name="adiantestacionamentopara"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Adiantamento de Estacionamento Para</FormLabel>
                              <FormControl>
                                <Input {...field} className="font-roboto" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <CurrencyFormField name="adiantestacionamentovalor" label="Valor do Adiantamento R$" />
                        <CurrencyFormField name="valorestacionamentototal" label="Total Estacionamento R$" readOnly />
                        <CurrencyFormField name="restanteestacionamento" label="Valor Restante" readOnly />
                      </CardContent>
                    </Card>

                    {/* Traslados */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-inter">Traslados</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name="adianttrasladospara"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Adiantamento de Traslados Para</FormLabel>
                              <FormControl>
                                <Input {...field} className="font-roboto" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <CurrencyFormField name="adianttrasladosvalor" label="Valor do Adiantamento R$" />
                        <CurrencyFormField name="valortrasladostotal" label="Total de Traslados R$" readOnly />
                        <CurrencyFormField name="restantetraslados" label="Valor Restante" readOnly />
                      </CardContent>
                    </Card>

                    {/* Hospedagem */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-inter">Hospedagem</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name="adianthospedagempara"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Adiantamento de Hospedagem Para</FormLabel>
                              <FormControl>
                                <Input {...field} className="font-roboto" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <CurrencyFormField name="adianthospedagemvalor" label="Valor do Adiantamento R$" />
                        <CurrencyFormField name="valorhospedagemtotal" label="Total de Hospedagem R$" readOnly />
                        <CurrencyFormField name="restantehospedagem" label="Valor Restante" readOnly />
                      </CardContent>
                    </Card>

                    {/* Passeios */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-inter">Passeios</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name="adiantpasseiospara"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Adiantamento de Passeios Para</FormLabel>
                              <FormControl>
                                <Input {...field} className="font-roboto" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <CurrencyFormField name="adiantpasseiosvalor" label="Valor do Adiantamento R$" />
                        <CurrencyFormField name="valorpasseiostotal" label="Total de Passeios R$" readOnly />
                        <CurrencyFormField name="restantepasseios" label="Valor Restante" readOnly />
                      </CardContent>
                    </Card>

                    {/* Brindes */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-inter">Brindes e Extras</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name="adiantbrindespara"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Adiantamento de Brindes Para</FormLabel>
                              <FormControl>
                                <Input {...field} className="font-roboto" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <CurrencyFormField name="adiantbrindesvalor" label="Valor do Adiantamento R$" />
                        <CurrencyFormField name="valorbrindestotal" label="Total de Brindes R$" readOnly />
                        <CurrencyFormField name="restantebrindeseextras" label="Valor Restante" readOnly />
                      </CardContent>
                    </Card>

                    {/* Resumo */}
                    <Card className="md:col-span-2">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-inter">Resumo</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <CurrencyFormField name="totaldespesas" label="Total de Despesas R$" readOnly />
                          <CurrencyFormField name="totaladiantamentos" label="Total de Adiantamentos R$" readOnly />
                          <CurrencyFormField name="restantetotal" label="Restante Total R$" readOnly />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full md:w-auto bg-navy hover:bg-navy/90 font-inter"
                  disabled={isSubmitting || !selectedViagem}
                >
                  {isSubmitting ? "Cadastrando..." : "Cadastrar Adiantamento"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdiantamentosForm;
