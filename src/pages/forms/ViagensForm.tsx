
import { formatDateForDB } from "@/utils/dateUtils";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { viagemSchema, ViagemFormValues, CalculatedValues } from "@/components/viagens/types";
import { useCalculateValues } from "@/hooks/useCalculateValues";
import { addDays } from "date-fns";

// Import sections
import {
  GeneralInfoSection,
  TaxasSection,
  TransporteSection,
  MotoristasSection,
  TrasladosSection,
  HospedagemSection,
  PasseiosSection,
  BrindesExtrasSection,
  SorteiosSection,
  OutrasReceitasSection,
  ResultadosSection,
} from "@/components/viagens/sections";

const ViagensForm = () => {
  const { toast } = useToast();
  const [calculatedValues, setCalculatedValues] = useState<CalculatedValues>({
    totaldespesastaxas: 0,
    totaldespesastransporte: 0,
    totaldespesasmotoristas: 0,
    totaldespesastraslados: 0,
    totaldespesashospedagem: 0,
    totaldespesaspasseios: 0,
    totaldespesasbrindeesextras: 0,
    brindestotal: 0,
    totaldespesassorteios: 0,
    totaloutrasreceitas: 0,
    qtdeassentos: 0,
    qtdereservadosguias: 0,
    qtdepromocionais: 0,
    qtdehospedes: 0,
    qtdenaopagantes: 0,
    qtdepagantes: 0,
    totalrefeicaomotorista: 0,
    totaldeslocamentosmotoristas: 0,
    qtdediarias: 0,
    totaldiarias: 0,
    despesatotal: 0,
    pontoequilibrio: 0,
    precosugerido: 0,
    receitatotal: 0,
    lucrobruto: 0,
  });

  const form = useForm<ViagemFormValues>({
    resolver: zodResolver(viagemSchema),
    defaultValues: {
      destino: "",
      cidadesvisitar: "",
      datapartida: new Date(),
      dataretorno: addDays(new Date(), 1),
      taxacidade: 0,
      taxaguialocal: 0,
      outrastaxasdescricao: "",
      outrastaxasvalor: 0,
      totaltaxas: 0,
      taxasobservacao: "",
      empresatransporte: "",
      contatoempresa: "",
      telefoneempresa: "",
      tipoveiculo: "Van", // Default value for the enum
      qtdeassentos: 0,
      qtdereservadosguias: 0,
      qtdepromocionais: 0,
      qtdehospedes: 0,
      qtdenaopagantes: 0,
      qtdepagantes: 0,
      frete: 0,
      estacionamento: 0,
      totaldespesastransporte: 0,
      qtdemotoristas: 1,
      qtdealmocosmotoristas: 0,
      qtdejantasmotoristas: 0,
      refeicaomotoristaunitario: 30,
      totalrefeicaomotorista: 0,
      qtdedeslocamentosmotoristas: 0,
      deslocamentomotoristaunitario: 0,
      totaldeslocamentosmotoristas: 0,
      totaldespesasmotoristas: 0,
      motoristasobservacao: "",
      traslado1descricao: "",
      qtdetraslado1: 0,
      traslado1valor: 0,
      traslado2descricao: "",
      qtdetraslado2: 0,
      traslado2valor: 0,
      traslado3descricao: "",
      qtdetraslado3: 0,
      traslado3valor: 0,
      totaltraslados: 0,
      tipohospedagem: "Hotel", // Default value for the enum
      nomehospedagem: "",
      contatohospedagem: "",
      telefonehospedagem: "",
      regimehospedagem: "Pernoite", // Default value for the enum
      qtdediarias: 0,
      valordiariaunitario: 0,
      totaldiarias: 0,
      outrosservicosdescricao: "",
      outrosservicosvalor: 0,
      totaldespesashospedagem: 0,
      hospedagemobservacao: "",
      qtdepasseios1: 0,
      descricaopasseios1: "",
      valorpasseios1: 0,
      qtdepasseios2: 0,
      descricaopasseios2: "",
      valorpasseios2: 0,
      qtdepasseios3: 0,
      descricaopasseios3: "",
      valorpasseios3: 0,
      totaldespesaspasseios: 0,
      passeiosobservacao: "",
      brindesdescricao: "",
      qtdebrindes: 0,
      brindesunitario: 0,
      brindestotal: 0,
      extras1descricao: "",
      extras1valor: 0,
      extras2descricao: "",
      extras2valor: 0,
      extras3descricao: "",
      extras3valor: 0,
      totaldespesasbrindeesextras: 0,
      brindeseextrasobservacao: "",
      sorteio1descricao: "",
      sorteio1qtde: 0,
      sorteio1valor: 0,
      sorteio2descricao: "",
      sorteio2qtde: 0,
      sorteio2valor: 0,
      sorteio3descricao: "",
      sorteio3qtde: 0,
      sorteio3valor: 0,
      totaldespesassorteios: 0,
      outrasreceitas1descricao: "",
      outrasreceitas1valor: 0,
      outrasreceitas2descricao: "",
      outrasreceitas2valor: 0,
      outrasreceitas3descricao: "",
      outrasreceitas3valor: 0,
      totaloutrasreceitas: 0,
      despesatotal: 0,
      precosugerido: 0,
      pontoequilibrio: 0,
      receitatotal: 0,
      lucrobruto: 0,
    },
    mode: "onChange",
  });

  const watchAllFields = form.watch();

  // Hook para calcular valores dinamicamente
  useCalculateValues(watchAllFields, form, setCalculatedValues);

  const onSubmit = async (data: ViagemFormValues) => {
    try {
      // Validate that required fields are present
      if (!data.destino) {
        toast({
          title: "Erro ao cadastrar viagem",
          description: "Destino é obrigatório",
          variant: "destructive",
        });
        return;
      }

      if (!data.empresatransporte) {
        toast({
          title: "Erro ao cadastrar viagem",
          description: "Empresa de transporte é obrigatória",
          variant: "destructive",
        });
        return;
      }

      // Format dates for database and ensure destino is included
      const viagemData = {
        destino: data.destino, // Explicitly include destino field
        datapartida: formatDateForDB(data.datapartida),
        dataretorno: formatDateForDB(data.dataretorno),
        // Include all the other fields from the form
        cidadesvisitar: data.cidadesvisitar,
        taxacidade: data.taxacidade,
        taxaguialocal: data.taxaguialocal,
        outrastaxasdescricao: data.outrastaxasdescricao,
        outrastaxasvalor: data.outrastaxasvalor,
        totaltaxas: data.totaltaxas,
        taxasobservacao: data.taxasobservacao,
        empresatransporte: data.empresatransporte,
        contatoempresa: data.contatoempresa,
        telefoneempresa: data.telefoneempresa,
        tipoveiculo: data.tipoveiculo,
        qtdeassentos: data.qtdeassentos,
        qtdereservadosguias: data.qtdereservadosguias,
        qtdepromocionais: data.qtdepromocionais,
        qtdehospedes: data.qtdehospedes,
        qtdenaopagantes: data.qtdenaopagantes,
        qtdepagantes: data.qtdepagantes,
        frete: data.frete,
        estacionamento: data.estacionamento,
        totaldespesastransporte: data.totaldespesastransporte,
        qtdemotoristas: data.qtdemotoristas,
        qtdealmocosmotoristas: data.qtdealmocosmotoristas,
        qtdejantasmotoristas: data.qtdejantasmotoristas,
        refeicaomotoristaunitario: data.refeicaomotoristaunitario,
        totalrefeicaomotorista: data.totalrefeicaomotorista,
        qtdedeslocamentosmotoristas: data.qtdedeslocamentosmotoristas,
        deslocamentomotoristaunitario: data.deslocamentomotoristaunitario,
        totaldeslocamentosmotoristas: data.totaldeslocamentosmotoristas,
        totaldespesasmotoristas: data.totaldespesasmotoristas,
        motoristasobservacao: data.motoristasobservacao,
        traslado1descricao: data.traslado1descricao,
        qtdetraslado1: data.qtdetraslado1,
        traslado1valor: data.traslado1valor,
        traslado2descricao: data.traslado2descricao,
        qtdetraslado2: data.qtdetraslado2,
        traslado2valor: data.traslado2valor,
        traslado3descricao: data.traslado3descricao,
        qtdetraslado3: data.qtdetraslado3,
        traslado3valor: data.traslado3valor,
        totaltraslados: data.totaltraslados,
        tipohospedagem: data.tipohospedagem,
        nomehospedagem: data.nomehospedagem,
        contatohospedagem: data.contatohospedagem,
        telefonehospedagem: data.telefonehospedagem,
        regimehospedagem: data.regimehospedagem,
        qtdediarias: data.qtdediarias,
        valordiariaunitario: data.valordiariaunitario,
        totaldiarias: data.totaldiarias,
        outrosservicosdescricao: data.outrosservicosdescricao,
        outrosservicosvalor: data.outrosservicosvalor,
        totaldespesashospedagem: data.totaldespesashospedagem,
        hospedagemobservacao: data.hospedagemobservacao,
        qtdepasseios1: data.qtdepasseios1,
        descricaopasseios1: data.descricaopasseios1,
        valorpasseios1: data.valorpasseios1,
        qtdepasseios2: data.qtdepasseios2,
        descricaopasseios2: data.descricaopasseios2,
        valorpasseios2: data.valorpasseios2,
        qtdepasseios3: data.qtdepasseios3,
        descricaopasseios3: data.descricaopasseios3,
        valorpasseios3: data.valorpasseios3,
        totaldespesaspasseios: data.totaldespesaspasseios,
        passeiosobservacao: data.passeiosobservacao,
        brindesdescricao: data.brindesdescricao,
        qtdebrindes: data.qtdebrindes,
        brindesunitario: data.brindesunitario,
        brindestotal: data.brindestotal,
        extras1descricao: data.extras1descricao,
        extras1valor: data.extras1valor,
        extras2descricao: data.extras2descricao,
        extras2valor: data.extras2valor,
        extras3descricao: data.extras3descricao,
        extras3valor: data.extras3valor,
        totaldespesasbrindeesextras: data.totaldespesasbrindeesextras,
        brindeseextrasobservacao: data.brindeseextrasobservacao,
        sorteio1descricao: data.sorteio1descricao,
        sorteio1qtde: data.sorteio1qtde,
        sorteio1valor: data.sorteio1valor,
        sorteio2descricao: data.sorteio2descricao,
        sorteio2qtde: data.sorteio2qtde,
        sorteio2valor: data.sorteio2valor,
        sorteio3descricao: data.sorteio3descricao,
        sorteio3qtde: data.sorteio3qtde,
        sorteio3valor: data.sorteio3valor,
        totaldespesassorteios: data.totaldespesassorteios,
        outrasreceitas1descricao: data.outrasreceitas1descricao,
        outrasreceitas1valor: data.outrasreceitas1valor,
        outrasreceitas2descricao: data.outrasreceitas2descricao,
        outrasreceitas2valor: data.outrasreceitas2valor,
        outrasreceitas3descricao: data.outrasreceitas3descricao,
        outrasreceitas3valor: data.outrasreceitas3valor,
        totaloutrasreceitas: data.totaloutrasreceitas,
        despesatotal: data.despesatotal,
        precosugerido: data.precosugerido,
        pontoequilibrio: data.pontoequilibrio,
        receitatotal: data.receitatotal,
        lucrobruto: data.lucrobruto,
      };

      const { error } = await supabase.from("viagens").insert(viagemData);

      if (error) throw error;

      toast({
        title: "Viagem cadastrada com sucesso!",
        description: "Os dados foram salvos no banco de dados.",
      });

      form.reset();
    } catch (error: any) {
      toast({
        title: "Erro ao cadastrar viagem",
        description: error.message || "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <Card className="w-full">
          <CardHeader className="bg-navy text-white">
            <CardTitle className="text-xl font-inter">Cadastro de Viagens</CardTitle>
            <CardDescription className="text-gray-200 font-roboto">
              Preencha os dados da viagem
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <GeneralInfoSection />
                <TaxasSection calculatedValues={calculatedValues} />
                <TransporteSection calculatedValues={calculatedValues} />
                <MotoristasSection calculatedValues={calculatedValues} />
                <TrasladosSection calculatedValues={calculatedValues} />
                <HospedagemSection calculatedValues={calculatedValues} />
                <PasseiosSection calculatedValues={calculatedValues} />
                <BrindesExtrasSection calculatedValues={calculatedValues} />
                <SorteiosSection calculatedValues={calculatedValues} />
                <OutrasReceitasSection calculatedValues={calculatedValues} />
                <ResultadosSection calculatedValues={calculatedValues} />

                <div className="flex justify-end">
                  <Button type="submit" className="bg-navy hover:bg-navy/90">
                    Cadastrar Viagem
                  </Button>
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ViagensForm;
