
import { useEffect } from 'react';
import { ViagemFormValues, CalculatedValues } from '@/components/viagens/types';
import { UseFormReturn } from 'react-hook-form';
import {
  calculateVehicleCapacities,
  calculateTaxes,
  calculateTransportation,
  calculateDriverExpenses,
  calculateTransfers,
  calculateDays,
  calculateAccommodation,
  calculateTourExpenses,
  calculateGiftExpenses,
  calculateRaffleExpenses,
  calculateOtherRevenues,
  calculateFinancials
} from './calculations';

// Hook for calculating values
export const useCalculateValues = (
  watchAllFields: ViagemFormValues,
  form: UseFormReturn<ViagemFormValues>,
  setCalculatedValues: (values: CalculatedValues) => void
) => {
  // A chave para evitar o loop infinito é usar um useEffect com dependências específicas,
  // em vez de depender de todo o watchAllFields que muda a cada render
  useEffect(() => {
    const calculateValues = () => {
      try {
        // Calculate vehicle capacities
        const { qtdeassentos, qtdereservadosguias, qtdepromocionais } = 
          calculateVehicleCapacities(watchAllFields.tipoveiculo);
        
        // Get number of drivers
        const qtdemotoristas = Number(watchAllFields.qtdemotoristas) || 0;

        // Calculate taxes
        const { totaltaxas } = calculateTaxes(watchAllFields);

        // Calculate transportation expenses
        const { totaldespesastransporte } = calculateTransportation(watchAllFields);

        // Calculate driver expenses
        const { 
          totalrefeicaomotorista, 
          totaldeslocamentosmotoristas, 
          totaldespesasmotoristas 
        } = calculateDriverExpenses(watchAllFields);

        // Calculate transfer expenses
        const { totaltraslados } = calculateTransfers(watchAllFields);

        // Calculate days
        const qtdeDiarias = calculateDays(
          watchAllFields.datapartida,
          watchAllFields.dataretorno
        );
        
        // Calculate number of guests and non-paying guests
        const qtdehospedes = qtdeassentos + qtdemotoristas;
        const qtdenaopagantes = qtdereservadosguias + qtdepromocionais;
        const qtdepagantes = qtdeassentos - qtdenaopagantes;

        // Calculate accommodation expenses
        const { 
          totaldiarias, 
          totaldespesashospedagem 
        } = calculateAccommodation(watchAllFields, qtdeDiarias, qtdehospedes);

        // Calculate tour expenses
        const { totaldespesaspasseios } = calculateTourExpenses(watchAllFields);

        // Calculate gift expenses
        const qtdeBrindes = qtdeassentos;
        const { 
          brindestotal, 
          totaldespesasbrindeesextras 
        } = calculateGiftExpenses(watchAllFields, qtdeBrindes);

        // Calculate raffle expenses
        const { totaldespesassorteios } = calculateRaffleExpenses(watchAllFields);

        // Calculate other revenues
        const { totaloutrasreceitas } = calculateOtherRevenues(watchAllFields);

        // Calculate total expenses (garante que é um número)
        const despesatotal = Number(
          totaltaxas +
          totaldespesastransporte +
          totaldespesasmotoristas +
          totaltraslados +
          totaldespesashospedagem +
          totaldespesaspasseios +
          totaldespesasbrindeesextras +
          totaldespesassorteios
        );

        // Calculate financials with fixed precision
        const { 
          pontoequilibrio, 
          precosugerido, 
          receitatotal, 
          lucrobruto 
        } = calculateFinancials(despesatotal, qtdepagantes, totaloutrasreceitas);

        console.log("CÁLCULO DO PREÇO SUGERIDO:", {
          despesatotal,
          qtdepagantes,
          pontoequilibrio,
          margemLucro: 0.15,
          precosugerido,
          receitatotal,
          lucrobruto
        });

        console.log("Calculando valores:", { 
          despesatotal, 
          qtdepagantes, 
          pontoequilibrio, 
          precosugerido, 
          receitatotal, 
          totaloutrasreceitas,
          lucrobruto 
        });
        
        // Update form values with exact numerical values
        form.setValue('qtdebrindes', qtdeBrindes);
        form.setValue('totaltaxas', Number(totaltaxas.toFixed(2)));
        form.setValue('totaldespesastransporte', Number(totaldespesastransporte.toFixed(2)));
        form.setValue('totalrefeicaomotorista', Number(totalrefeicaomotorista.toFixed(2)));
        form.setValue('totaldeslocamentosmotoristas', Number(totaldeslocamentosmotoristas.toFixed(2)));
        form.setValue('totaldespesasmotoristas', Number(totaldespesasmotoristas.toFixed(2)));
        form.setValue('totaltraslados', Number(totaltraslados.toFixed(2)));
        form.setValue('qtdehospedes', qtdehospedes);
        form.setValue('totaldiarias', Number(totaldiarias.toFixed(2)));
        form.setValue('totaldespesashospedagem', Number(totaldespesashospedagem.toFixed(2)));
        form.setValue('totaldespesaspasseios', Number(totaldespesaspasseios.toFixed(2)));
        form.setValue('brindestotal', Number(brindestotal.toFixed(2)));
        form.setValue('totaldespesasbrindeesextras', Number(totaldespesasbrindeesextras.toFixed(2)));
        form.setValue('totaldespesassorteios', Number(totaldespesassorteios.toFixed(2)));
        form.setValue('totaloutrasreceitas', Number(totaloutrasreceitas.toFixed(2)));
        form.setValue('despesatotal', Number(despesatotal.toFixed(2)));
        form.setValue('pontoequilibrio', pontoequilibrio);
        
        // Só atualiza o preço sugerido se não estiver sendo editado manualmente
        // Isso evita loop infinito e interrupção da edição manual
        if (!form.getValues('precosugerido')) {
          form.setValue('precosugerido', precosugerido, {
            shouldDirty: true,
            shouldTouch: true
          });
        }
        
        form.setValue('receitatotal', receitatotal);
        form.setValue('lucrobruto', lucrobruto);
        form.setValue('qtdediarias', qtdeDiarias);
        form.setValue('qtdeassentos', qtdeassentos);
        form.setValue('qtdereservadosguias', qtdereservadosguias);
        form.setValue('qtdepromocionais', qtdepromocionais);
        form.setValue('qtdenaopagantes', qtdenaopagantes);
        form.setValue('qtdepagantes', qtdepagantes);
        
        // Set calculated values for other components
        setCalculatedValues({
          totaldespesastaxas: Number(totaltaxas.toFixed(2)),
          totaldespesastransporte: Number(totaldespesastransporte.toFixed(2)),
          totaldespesasmotoristas: Number(totaldespesasmotoristas.toFixed(2)),
          totaldespesastraslados: Number(totaltraslados.toFixed(2)),
          totaldespesashospedagem: Number(totaldespesashospedagem.toFixed(2)),
          totaldespesaspasseios: Number(totaldespesaspasseios.toFixed(2)),
          totaldespesasbrindeesextras: Number(totaldespesasbrindeesextras.toFixed(2)),
          brindestotal: Number(brindestotal.toFixed(2)),
          totaldespesassorteios: Number(totaldespesassorteios.toFixed(2)),
          totaloutrasreceitas: Number(totaloutrasreceitas.toFixed(2)),
          qtdeassentos,
          qtdereservadosguias,
          qtdepromocionais,
          qtdenaopagantes,
          qtdepagantes,
          totalrefeicaomotorista: Number(totalrefeicaomotorista.toFixed(2)),
          totaldeslocamentosmotoristas: Number(totaldeslocamentosmotoristas.toFixed(2)),
          qtdediarias: qtdeDiarias,
          totaldiarias: Number(totaldiarias.toFixed(2)),
          qtdehospedes,
          despesatotal: Number(despesatotal.toFixed(2)),
          pontoequilibrio,
          precosugerido,
          receitatotal,
          lucrobruto,
        });
      } catch (error) {
        console.error("Erro nos cálculos:", error);
      }
    };

    calculateValues();
  }, [
    // Lista específica de dependências que devem disparar novos cálculos
    watchAllFields.tipoveiculo,
    watchAllFields.qtdemotoristas,
    watchAllFields.datapartida,
    watchAllFields.dataretorno,
    watchAllFields.taxacidade,
    watchAllFields.taxaguialocal,
    watchAllFields.outrastaxasvalor,
    watchAllFields.frete,
    watchAllFields.estacionamento,
    watchAllFields.qtdealmocosmotoristas,
    watchAllFields.qtdejantasmotoristas,
    watchAllFields.refeicaomotoristaunitario,
    watchAllFields.qtdedeslocamentosmotoristas,
    watchAllFields.deslocamentomotoristaunitario,
    watchAllFields.qtdetraslado1,
    watchAllFields.traslado1valor,
    watchAllFields.qtdetraslado2,
    watchAllFields.traslado2valor,
    watchAllFields.qtdetraslado3,
    watchAllFields.traslado3valor,
    watchAllFields.valordiariaunitario,
    watchAllFields.outrosservicosvalor,
    watchAllFields.qtdepasseios1,
    watchAllFields.valorpasseios1,
    watchAllFields.qtdepasseios2,
    watchAllFields.valorpasseios2,
    watchAllFields.qtdepasseios3,
    watchAllFields.valorpasseios3,
    watchAllFields.brindesunitario,
    watchAllFields.extras1valor,
    watchAllFields.extras2valor,
    watchAllFields.extras3valor,
    watchAllFields.sorteio1qtde,
    watchAllFields.sorteio1valor,
    watchAllFields.sorteio2qtde,
    watchAllFields.sorteio2valor,
    watchAllFields.sorteio3qtde,
    watchAllFields.sorteio3valor,
    watchAllFields.outrasreceitas1valor,
    watchAllFields.outrasreceitas2valor,
    watchAllFields.outrasreceitas3valor,
    form,
    setCalculatedValues
  ]);
};
