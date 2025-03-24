
import { ViagemFormValues } from '@/components/viagens/types';
import { differenceInDays } from 'date-fns';

// Calculate taxes and fees
export const calculateTaxes = (watchAllFields: ViagemFormValues) => {
  const taxaCidade = Number(watchAllFields.taxacidade) || 0;
  const taxaGuiaLocal = Number(watchAllFields.taxaguialocal) || 0;
  const outrasTaxasValor = Number(watchAllFields.outrastaxasvalor) || 0;
  const estacionamento = Number(watchAllFields.estacionamento) || 0;
  
  return {
    taxaCidade,
    taxaGuiaLocal,
    outrasTaxasValor,
    estacionamento,
    totaltaxas: taxaCidade + taxaGuiaLocal + outrasTaxasValor + estacionamento
  };
};

// Calculate driver expenses
export const calculateDriverExpenses = (watchAllFields: ViagemFormValues) => {
  const qtdeMotoristasValue = Number(watchAllFields.qtdemotoristas) || 0;
  const qtdeAlmocosValue = Number(watchAllFields.qtdealmocosmotoristas) || 0;
  const qtdeJantasValue = Number(watchAllFields.qtdejantasmotoristas) || 0;
  const valorRefeicaoUnit = Number(watchAllFields.refeicaomotoristaunitario) || 0;
  const totalrefeicaomotorista = (qtdeAlmocosValue + qtdeJantasValue) * qtdeMotoristasValue * valorRefeicaoUnit;
  
  const qtdeDeslocamentosValue = Number(watchAllFields.qtdedeslocamentosmotoristas) || 0;
  const valorDeslocamentoUnit = Number(watchAllFields.deslocamentomotoristaunitario) || 0;
  const totaldeslocamentosmotoristas = qtdeDeslocamentosValue * valorDeslocamentoUnit;
  
  return {
    totalrefeicaomotorista,
    totaldeslocamentosmotoristas,
    totaldespesasmotoristas: totalrefeicaomotorista + totaldeslocamentosmotoristas
  };
};

// Calculate transfer expenses
export const calculateTransfers = (watchAllFields: ViagemFormValues) => {
  const qtdeTraslado1 = Number(watchAllFields.qtdetraslado1) || 0;
  const traslado1Valor = Number(watchAllFields.traslado1valor) || 0;
  const qtdeTraslado2 = Number(watchAllFields.qtdetraslado2) || 0;
  const traslado2Valor = Number(watchAllFields.traslado2valor) || 0;
  const qtdeTraslado3 = Number(watchAllFields.qtdetraslado3) || 0;
  const traslado3Valor = Number(watchAllFields.traslado3valor) || 0;
  
  return {
    totaltraslados: (qtdeTraslado1 * traslado1Valor) + 
                    (qtdeTraslado2 * traslado2Valor) + 
                    (qtdeTraslado3 * traslado3Valor)
  };
};

// Calculate number of days
export const calculateDays = (datapartida?: Date, dataretorno?: Date) => {
  if (datapartida && dataretorno) {
    const dataPartida = new Date(datapartida);
    const dataRetorno = new Date(dataretorno);
    if (dataPartida && dataRetorno && dataPartida.getTime() <= dataRetorno.getTime()) {
      const qtdeDiarias = differenceInDays(dataRetorno, dataPartida);
      return qtdeDiarias > 0 ? qtdeDiarias : 0;
    }
  }
  return 0;
};

// Calculate tour expenses
export const calculateTourExpenses = (watchAllFields: ViagemFormValues) => {
  const qtdePasseios1 = Number(watchAllFields.qtdepasseios1) || 0;
  const valorPasseios1 = Number(watchAllFields.valorpasseios1) || 0;
  const qtdePasseios2 = Number(watchAllFields.qtdepasseios2) || 0;
  const valorPasseios2 = Number(watchAllFields.valorpasseios2) || 0;
  const qtdePasseios3 = Number(watchAllFields.qtdepasseios3) || 0;
  const valorPasseios3 = Number(watchAllFields.valorpasseios3) || 0;
  
  return {
    totaldespesaspasseios: (qtdePasseios1 * valorPasseios1) + 
                           (qtdePasseios2 * valorPasseios2) + 
                           (qtdePasseios3 * valorPasseios3)
  };
};

// Calculate gift expenses
export const calculateGiftExpenses = (watchAllFields: ViagemFormValues, qtdeBrindes: number) => {
  const brindesUnitario = Number(watchAllFields.brindesunitario) || 0;
  const brindestotal = qtdeBrindes * brindesUnitario;
  
  const extras1Valor = Number(watchAllFields.extras1valor) || 0;
  const extras2Valor = Number(watchAllFields.extras2valor) || 0;
  const extras3Valor = Number(watchAllFields.extras3valor) || 0;
  
  return {
    brindestotal,
    totaldespesasbrindeesextras: brindestotal + extras1Valor + extras2Valor + extras3Valor
  };
};

// Calculate raffle expenses
export const calculateRaffleExpenses = (watchAllFields: ViagemFormValues) => {
  const sorteio1Qtde = Number(watchAllFields.sorteio1qtde) || 0;
  const sorteio1Valor = Number(watchAllFields.sorteio1valor) || 0;
  const sorteio2Qtde = Number(watchAllFields.sorteio2qtde) || 0;
  const sorteio2Valor = Number(watchAllFields.sorteio2valor) || 0;
  const sorteio3Qtde = Number(watchAllFields.sorteio3qtde) || 0;
  const sorteio3Valor = Number(watchAllFields.sorteio3valor) || 0;
  
  return {
    totaldespesassorteios: (sorteio1Qtde * sorteio1Valor) + 
                           (sorteio2Qtde * sorteio2Valor) + 
                           (sorteio3Qtde * sorteio3Valor)
  };
};
