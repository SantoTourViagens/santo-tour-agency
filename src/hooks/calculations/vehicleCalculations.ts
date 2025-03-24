
import { ViagemFormValues } from '@/components/viagens/types';

// Calculates vehicle capacities based on type
export const calculateVehicleCapacities = (tipoveiculo: string) => {
  let qtdeassentos = 0;
  let qtdereservadosguias = 0;
  let qtdepromocionais = 0;
  
  if (tipoveiculo === "Van") {
    qtdeassentos = 15;
    qtdereservadosguias = 1;
    qtdepromocionais = 1;
  } else if (tipoveiculo === "Ônibus") {
    qtdeassentos = 46;
    qtdereservadosguias = 2;
    qtdepromocionais = 2;
  } else if (tipoveiculo === "Semi Leito") {
    qtdeassentos = 44;
    qtdereservadosguias = 2;
    qtdepromocionais = 2;
  } else if (tipoveiculo === "Microônibus") {
    qtdeassentos = 28;
    qtdereservadosguias = 1;
    qtdepromocionais = 1;
  } else if (tipoveiculo === "Carro") {
    qtdeassentos = 7;
    qtdereservadosguias = 1;
    qtdepromocionais = 0;
  }
  
  return { qtdeassentos, qtdereservadosguias, qtdepromocionais };
};

// Calculate transportation expenses
export const calculateTransportation = (watchAllFields: ViagemFormValues) => {
  const frete = Number(watchAllFields.frete) || 0;
  return {
    frete,
    totaldespesastransporte: frete
  };
};
