
import { ViagemFormValues } from '@/components/viagens/types';

// Calculate accommodation expenses
export const calculateAccommodation = (watchAllFields: ViagemFormValues, qtdeDiarias: number, qtdehospedes: number) => {
  const valorDiariaUnit = Number(watchAllFields.valordiariaunitario) || 0;
  const totaldiarias = qtdehospedes * valorDiariaUnit;
  const outrosServicosValor = Number(watchAllFields.outrosservicosvalor) || 0;
  
  return {
    valorDiariaUnit,
    totaldiarias,
    outrosServicosValor,
    totaldespesashospedagem: (totaldiarias * qtdeDiarias) + outrosServicosValor
  };
};
