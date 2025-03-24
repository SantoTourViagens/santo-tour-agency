
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PassageiroFormValues, passageiroSchema } from "@/components/passageiros/types";
import { toDisplayDate } from "@/utils/dateUtils";
import { unmask } from "@/utils/masks";

export const usePassageiroForm = () => {
  const { toast } = useToast();
  const [listaViagens, setListaViagens] = useState<{ value: string; label: string }[]>([]);
  const [activeTab, setActiveTab] = useState("dados-pessoais");
  const [passageiroId, setPassageiroId] = useState<number | null>(null);
  const [isPassageiroLoaded, setIsPassageiroLoaded] = useState(false);

  const form = useForm<PassageiroFormValues>({
    resolver: zodResolver(passageiroSchema),
    defaultValues: {
      idviagem: "",
      nomeviagem: "",
      cpfpassageiro: "",
      nomepassageiro: "",
      telefonepassageiro: "",
      bairropassageiro: "",
      cidadepassageiro: "",
      localembarquepassageiro: "",
      enderecoembarquepassageiro: "",
      passageiroindicadopor: "",
      dataviagem: new Date().toISOString().split('T')[0],
      valorviagem: 0,
      pagamentoavista: true,
      datapagamentoavista: "",
      formapagamentoavista: "Dinheiro",
      valorfaltareceber: 0,
      datasinal: "",
      valorsinal: 0,
      dataparcela2: "",
      valorparcela2: 0,
      dataparcela3: "",
      valorparcela3: 0,
      dataparcela4: "",
      valorparcela4: 0,
      dataparcela5: "",
      valorparcela5: 0,
      dataparcela6: "",
      valorparcela6: 0,
      dataparcela7: "",
      valorparcela7: 0,
      dataparcela8: "",
      valorparcela8: 0,
      dataparcela9: "",
      valorparcela9: 0,
      dataparcela10: "",
      valorparcela10: 0,
      dataparcela11: "",
      valorparcela11: 0,
      dataparcela12: "",
      valorparcela12: 0,
    },
  });

  const fetchViagens = async () => {
    const { data, error } = await supabase
      .from('viagens')
      .select('id, destino, datapartida');
    
    if (error) {
      toast({
        title: "Erro ao buscar viagens",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    
    if (data) {
      const viagensFormatted = data.map(viagem => ({
        value: viagem.id.toString(),
        label: `${viagem.destino} - ${viagem.datapartida ? toDisplayDate(viagem.datapartida) : ''}`,
      }));
      setListaViagens(viagensFormatted);
    }
  };

  const onSubmit = async (data: PassageiroFormValues) => {
    try {
      const nomeViagem = listaViagens.find(v => v.value === data.idviagem)?.label || "";
      
      // Clean date values to avoid invalid input for date type
      const cleanDateValue = (dateStr: string | null | undefined) => {
        return dateStr && dateStr.trim() !== "" ? dateStr : null;
      };
      
      const passageiroData = {
        idviagem: data.idviagem,
        nomeviagem: nomeViagem,
        valorviagem: data.valorviagem,
        dataviagem: data.dataviagem,
        cpfpassageiro: data.cpfpassageiro,
        nomepassageiro: data.nomepassageiro,
        telefonepassageiro: data.telefonepassageiro,
        bairropassageiro: data.bairropassageiro,
        cidadepassageiro: data.cidadepassageiro,
        localembarquepassageiro: data.localembarquepassageiro,
        enderecoembarquepassageiro: data.enderecoembarquepassageiro,
        passageiroindicadopor: data.passageiroindicadopor || null,
        pagamentoavista: data.pagamentoavista,
        datapagamentoavista: cleanDateValue(data.datapagamentoavista),
        formapagamentoavista: data.formapagamentoavista,
        valorfaltareceber: data.valorfaltareceber,
        datasinal: cleanDateValue(data.datasinal),
        valorsinal: data.valorsinal,
        dataparcela2: cleanDateValue(data.dataparcela2),
        valorparcela2: data.valorparcela2,
        dataparcela3: cleanDateValue(data.dataparcela3),
        valorparcela3: data.valorparcela3,
        dataparcela4: cleanDateValue(data.dataparcela4),
        valorparcela4: data.valorparcela4,
        dataparcela5: cleanDateValue(data.dataparcela5),
        valorparcela5: data.valorparcela5,
        dataparcela6: cleanDateValue(data.dataparcela6),
        valorparcela6: data.valorparcela6,
        dataparcela7: cleanDateValue(data.dataparcela7),
        valorparcela7: data.valorparcela7,
        dataparcela8: cleanDateValue(data.dataparcela8),
        valorparcela8: data.valorparcela8,
        dataparcela9: cleanDateValue(data.dataparcela9),
        valorparcela9: data.valorparcela9,
        dataparcela10: cleanDateValue(data.dataparcela10),
        valorparcela10: data.valorparcela10,
        dataparcela11: cleanDateValue(data.dataparcela11),
        valorparcela11: data.valorparcela11,
        dataparcela12: cleanDateValue(data.dataparcela12),
        valorparcela12: data.valorparcela12,
      };
      
      let error;
      
      if (passageiroId) {
        // Update existing passenger
        const { error: updateError } = await supabase
          .from('passageiros')
          .update(passageiroData)
          .eq('id', passageiroId);
        
        error = updateError;
        
        toast({
          title: "Passageiro atualizado com sucesso!",
          description: "Os dados foram atualizados no banco de dados.",
        });
      } else {
        // Insert new passenger
        const { error: insertError } = await supabase
          .from('passageiros')
          .insert(passageiroData);
        
        error = insertError;
        
        toast({
          title: "Passageiro cadastrado com sucesso!",
          description: "Os dados foram salvos no banco de dados.",
        });
      }
      
      if (error) throw error;
      
      form.reset();
      setActiveTab("dados-pessoais");
      setPassageiroId(null);
      setIsPassageiroLoaded(false);
    } catch (error: any) {
      toast({
        title: "Erro ao cadastrar passageiro",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleViagemChange = async (viagemId: string) => {
    if (!viagemId) return;
    
    // Reset passenger data when changing trip
    setPassageiroId(null);
    setIsPassageiroLoaded(false);
    form.reset({
      idviagem: viagemId,
      nomeviagem: "",
      cpfpassageiro: "",
      nomepassageiro: "",
      telefonepassageiro: "",
      bairropassageiro: "",
      cidadepassageiro: "",
      localembarquepassageiro: "",
      enderecoembarquepassageiro: "",
      passageiroindicadopor: "",
      dataviagem: new Date().toISOString().split('T')[0],
      valorviagem: 0,
      pagamentoavista: true,
      datapagamentoavista: "",
      formapagamentoavista: "Dinheiro",
      valorfaltareceber: 0,
      datasinal: "",
      valorsinal: 0,
      dataparcela2: "",
      valorparcela2: 0,
      dataparcela3: "",
      valorparcela3: 0,
      dataparcela4: "",
      valorparcela4: 0,
      dataparcela5: "",
      valorparcela5: 0,
      dataparcela6: "",
      valorparcela6: 0,
      dataparcela7: "",
      valorparcela7: 0,
      dataparcela8: "",
      valorparcela8: 0,
      dataparcela9: "",
      valorparcela9: 0,
      dataparcela10: "",
      valorparcela10: 0,
      dataparcela11: "",
      valorparcela11: 0,
      dataparcela12: "",
      valorparcela12: 0,
    });
    
    const { data: viagemData, error } = await supabase
      .from('viagens')
      .select('datapartida, precosugerido')
      .eq('id', viagemId)
      .single();
    
    if (error) {
      toast({
        title: "Erro ao buscar dados da viagem",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    
    if (viagemData) {
      form.setValue("idviagem", viagemId);
      if (viagemData.datapartida) {
        form.setValue("dataviagem", new Date(viagemData.datapartida).toISOString().split('T')[0]);
      }
      
      // Fix for number string conversion
      if (viagemData.precosugerido !== null && viagemData.precosugerido !== undefined) {
        const precoNum = Number(viagemData.precosugerido);
        form.setValue("valorviagem", precoNum);
      }
      
      if (!form.getValues("pagamentoavista")) {
        // Ensure number for valorfaltareceber
        const valorViagem = form.getValues("valorviagem");
        form.setValue("valorfaltareceber", valorViagem);
      }
    }
  };

  const handleCPFChange = async (cpf: string) => {
    if (cpf.length < 11) {
      form.setValue("passageiroindicadopor", "");
      setPassageiroId(null);
      setIsPassageiroLoaded(false);
      return;
    }
    
    const unmaskedCPF = unmask(cpf);
    const viagemId = form.getValues("idviagem");
    
    if (viagemId) {
      // Verificar se o passageiro já está cadastrado nesta viagem
      const { data: passageiroData, error: passageiroError } = await supabase
        .from('passageiros')
        .select('*')
        .eq('cpfpassageiro', unmaskedCPF)
        .eq('idviagem', viagemId)
        .single();
      
      if (!passageiroError && passageiroData) {
        // O passageiro existe para esta viagem
        if (passageiroData.id !== undefined) {
          setPassageiroId(Number(passageiroData.id));
          setIsPassageiroLoaded(true);
        }
        
        // Fix for deep type instantiation with simplified form value setting
        const setPassageiroValues = (data: any) => {
          // List of fields we know are in the form
          const formFields = [
            "nomeviagem", "idviagem", "valorviagem", "dataviagem", "cpfpassageiro",
            "nomepassageiro", "telefonepassageiro", "bairropassageiro", "cidadepassageiro",
            "localembarquepassageiro", "enderecoembarquepassageiro", "passageiroindicadopor",
            "pagamentoavista", "datapagamentoavista", "formapagamentoavista", "valorfaltareceber",
            "datasinal", "valorsinal", "dataparcela2", "valorparcela2", "dataparcela3",
            "valorparcela3", "dataparcela4", "valorparcela4", "dataparcela5", "valorparcela5",
            "dataparcela6", "valorparcela6", "dataparcela7", "valorparcela7", "dataparcela8",
            "valorparcela8", "dataparcela9", "valorparcela9", "dataparcela10", "valorparcela10",
            "dataparcela11", "valorparcela11", "dataparcela12", "valorparcela12"
          ];
          
          // Only set values for fields we know exist in our form
          for (const fieldName of formFields) {
            if (fieldName in data && fieldName !== "id" && fieldName !== "created_at") {
              form.setValue(fieldName as keyof PassageiroFormValues, data[fieldName]);
            }
          }
        };
        
        // Apply the passenger data
        setPassageiroValues(passageiroData);
        
        toast({
          title: "Passageiro encontrado",
          description: "Os dados do passageiro para esta viagem foram carregados.",
        });
        
        return;
      }
    }
    
    // Busca comum de dados do cliente quando não encontrado como passageiro na viagem
    const { data, error } = await supabase
      .from('clientes')
      .select('nome, telefone, datanascimento, bairro, cidade, localembarque, enderecoembarque, indicadopor')
      .eq('cpf', unmaskedCPF)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      toast({
        title: "Erro ao buscar dados do cliente",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    
    if (data) {
      // Set basic client data
      form.setValue("nomepassageiro", data.nome);
      form.setValue("telefonepassageiro", data.telefone);
      form.setValue("bairropassageiro", data.bairro);
      form.setValue("cidadepassageiro", data.cidade);
      form.setValue("localembarquepassageiro", data.localembarque || '');
      form.setValue("enderecoembarquepassageiro", data.enderecoembarque || '');
      
      // Handle indicador search
      if (data.indicadopor) {
        const indicadorCPF = unmask(data.indicadopor);
        
        const { data: indicadorData, error: indicadorError } = await supabase
          .from('clientes')
          .select('nome')
          .or(`cpf.eq.${indicadorCPF},cpf.eq.${data.indicadopor}`)
          .single();
        
        console.log("Original Indicador CPF:", data.indicadopor);
        console.log("Unmasked Indicador CPF:", indicadorCPF);
        console.log("Indicador Data:", indicadorData);
        console.log("Indicador Error:", indicadorError);
        
        if (indicadorError && indicadorError.code !== 'PGRST116') {
          toast({
            title: "Erro ao buscar dados do indicador",
            description: indicadorError.message,
            variant: "destructive",
          });
          form.setValue("passageiroindicadopor", "");
        } else if (indicadorData?.nome) {
          form.setValue("passageiroindicadopor", indicadorData.nome);
        } else {
          form.setValue("passageiroindicadopor", "Indicador não encontrado");
        }
      } else {
        form.setValue("passageiroindicadopor", "");
      }
    } else {
      // Clear all fields if no client is found
      form.setValue("passageiroindicadopor", "");
    }
  };

  const handlePagamentoAVistaChange = (value: boolean) => {
    form.setValue("pagamentoavista", value);
    if (value) {
      form.setValue("valorfaltareceber", 0);
      const today = new Date().toISOString().split('T')[0];
      form.setValue("datapagamentoavista", today);
    } else {
      // Ensure number for valorfaltareceber
      const valorViagem = form.getValues("valorviagem");
      form.setValue("valorfaltareceber", valorViagem);
      form.setValue("datapagamentoavista", "");
    }
  };
  
  const handleDeletePassageiro = async () => {
    if (!passageiroId) {
      toast({
        title: "Erro ao excluir passageiro",
        description: "Nenhum passageiro selecionado para exclusão.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const { error } = await supabase
        .from('passageiros')
        .delete()
        .eq('id', passageiroId);
      
      if (error) throw error;
      
      toast({
        title: "Passageiro excluído com sucesso!",
        description: "O passageiro foi removido do banco de dados.",
      });
      
      // Reset form and states
      form.reset();
      setActiveTab("dados-pessoais");
      setPassageiroId(null);
      setIsPassageiroLoaded(false);
    } catch (error: any) {
      toast({
        title: "Erro ao excluir passageiro",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return {
    form,
    listaViagens,
    activeTab,
    passageiroId,
    isPassageiroLoaded,
    setActiveTab,
    handleViagemChange,
    handleCPFChange,
    handlePagamentoAVistaChange,
    handleDeletePassageiro,
    onSubmit,
    fetchViagens
  };
};
