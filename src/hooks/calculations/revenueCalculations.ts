
import { ViagemFormValues } from '@/components/viagens/types';

// Calculate other revenues
export const calculateOtherRevenues = (watchAllFields: ViagemFormValues) => {
  const outrasReceitas1Valor = Number(watchAllFields.outrasreceitas1valor) || 0;
  const outrasReceitas2Valor = Number(watchAllFields.outrasreceitas2valor) || 0;
  const outrasReceitas3Valor = Number(watchAllFields.outrasreceitas3valor) || 0;
  
  return {
    totaloutrasreceitas: outrasReceitas1Valor + outrasReceitas2Valor + outrasReceitas3Valor
  };
};

// Calculate total expenses, break-even point, and suggested price
export const calculateFinancials = (
  despesaTotal: number, 
  qtdePagantes: number, 
  totaloutrasreceitas: number
) => {
  // Garantir que os valores são numéricos
  const despesaTotalNum = Number(despesaTotal) || 0;
  const qtdePagantesNum = Number(qtdePagantes) || 0;
  const totaloutrasreceitasNum = Number(totaloutrasreceitas) || 0;

  // Calcular ponto de equilíbrio (evitando divisão por zero)
  const pontoequilibrio = qtdePagantesNum > 0 ? Number((despesaTotalNum / qtdePagantesNum).toFixed(2)) : 0;
  
  // Aplicar margem de lucro fixada em 15%
  const margemLucro = 0.15;
  // Calcular preço sugerido com precisão de 2 casas decimais
  const precosugerido = Number((pontoequilibrio * (1 + margemLucro)).toFixed(2));
  
  // Calcular receita total baseada no preço sugerido
  const receitatotal = Number((qtdePagantesNum * precosugerido).toFixed(2));
  
  // Calcular lucro bruto - CORRIGIDO para incluir totaloutrasreceitas
  const lucrobruto = Number((receitatotal + totaloutrasreceitasNum - despesaTotalNum).toFixed(2));

  console.log("CÁLCULO FINANCEIRO:", {
    despesaTotal: despesaTotalNum,
    qtdePagantes: qtdePagantesNum,
    pontoequilibrio,
    margemLucro,
    precosugerido,
    receitatotal,
    totaloutrasreceitas: totaloutrasreceitasNum,
    lucrobruto
  });

  return {
    pontoequilibrio,
    precosugerido,
    receitatotal,
    lucrobruto
  };
};

// Calculate updated financials when price is manually edited
export const recalculateFinancialsWithCustomPrice = (
  precoCustomizado: number,
  qtdePagantes: number,
  despesaTotal: number,
  totaloutrasreceitas: number
) => {
  // Ensure all values are proper numbers
  const precoNum = Number(precoCustomizado) || 0;
  const qtdePagantesNum = Number(qtdePagantes) || 0;
  const despesaTotalNum = Number(despesaTotal) || 0;
  const totaloutrasreceitasNum = Number(totaloutrasreceitas) || 0;
  
  console.log("RECÁLCULO - Valores de entrada:", {
    precoCustomizado: precoNum,
    qtdePagantes: qtdePagantesNum,
    despesaTotal: despesaTotalNum,
    totaloutrasreceitas: totaloutrasreceitasNum
  });
  
  // Calculate new total revenue based on custom price
  const novaReceitaTotal = Number((qtdePagantesNum * precoNum).toFixed(2));
  
  // Calculate new gross profit - CORRIGIDO para incluir outras receitas
  const novoLucroBruto = Number((novaReceitaTotal + totaloutrasreceitasNum - despesaTotalNum).toFixed(2));

  console.log("RECÁLCULO - Resultados:", {
    formula_receita: `${qtdePagantesNum} × ${precoNum} = ${novaReceitaTotal}`,
    formula_lucro: `${novaReceitaTotal} + ${totaloutrasreceitasNum} - ${despesaTotalNum} = ${novoLucroBruto}`,
    novaReceitaTotal,
    novoLucroBruto
  });
  
  return {
    receitatotal: novaReceitaTotal,
    lucrobruto: novoLucroBruto
  };
};
