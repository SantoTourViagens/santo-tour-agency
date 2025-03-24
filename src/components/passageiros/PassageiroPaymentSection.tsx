
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { PassageiroFormValues } from "./types";
import { IMaskInput } from "react-imask";

interface PassageiroPaymentSectionProps {
  form: UseFormReturn<PassageiroFormValues>;
  handlePagamentoAVistaChange: (value: boolean) => void;
}

// Importe a função maskDate
import { maskCPF, maskPhone, maskDate, unmask } from "@/utils/masks";

// Atualize a função formatDateForBackend
const formatDateForBackend = (dateStr: string) => {
  if (!dateStr) return "";
  const cleaned = dateStr.replace(/\D/g, '');
  if (cleaned.length !== 8) return null;
  const day = cleaned.slice(0, 2);
  const month = cleaned.slice(2, 4);
  const year = cleaned.slice(4, 8);
  return `${year}-${month}-${day}T00:00:00`;
};

// Substitua o componente MaskedDateInput
const MaskedDateInput = ({ value, onChange, placeholder, className }: any) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.length > 8) input = input.slice(0, 8);
    
    // Formatar como DD/MM/AAAA
    if (input.length >= 2) input = input.slice(0, 2) + '/' + input.slice(2);
    if (input.length >= 5) input = input.slice(0, 5) + '/' + input.slice(5);
    
    e.target.value = input;
    
    if (input.length === 10) {
      const formattedDate = formatDateForBackend(input);
      onChange(formattedDate);
    } else {
      onChange(input);
    }
  };

  // Formatar o valor para exibição
  const displayValue = value ? value.split('T')[0].split('-').reverse().join('/') : '';

  return (
    <Input
      type="text"
      value={displayValue}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
      maxLength={10}
    />
  );
};

const PassageiroPaymentSection = ({
  form,
  handlePagamentoAVistaChange,
}: PassageiroPaymentSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="pagamentoavista"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
            <FormControl>
              <Select 
                onValueChange={(value) => handlePagamentoAVistaChange(value === "true")}
                defaultValue={field.value ? "true" : "false"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de pagamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Pagamento à Vista</SelectItem>
                  <SelectItem value="false">Pagamento Parcelado</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {form.watch("pagamentoavista") && (
        <>
          <FormField
            control={form.control}
            name="datapagamentoavista"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter font-medium">Data do Pagamento</FormLabel>
                <FormControl>
                  <MaskedDateInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="DD-MM-YYYY"
                    className="font-roboto"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="formapagamentoavista"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter font-medium">Forma de Pagamento</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                    <SelectItem value="Crédito">Crédito</SelectItem>
                    <SelectItem value="Débito">Débito</SelectItem>
                    <SelectItem value="PIX">PIX</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
      
      {!form.watch("pagamentoavista") && <PaymentInstallmentsSection form={form} />}
    </div>
  );
};

interface PaymentInstallmentsSectionProps {
  form: UseFormReturn<PassageiroFormValues>;
}

const PaymentInstallmentsSection = ({ form }: PaymentInstallmentsSectionProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="valorfaltareceber"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-inter font-medium">Valor em Falta</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                value={field.value as number}
                className="font-roboto"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="datasinal"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-inter font-medium">Data do Sinal</FormLabel>
            <FormControl>
              <MaskedDateInput
                value={field.value}
                onChange={field.onChange}
                placeholder="DD-MM-YYYY"
                className="font-roboto"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="valorsinal"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-inter font-medium">Valor do Sinal</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                value={field.value as number}
                className="font-roboto"
                onChange={(e) => {
                  field.onChange(e);
                  const newValue = parseFloat(e.target.value) || 0;
                  const totalValue = form.getValues("valorviagem");
                  form.setValue("valorfaltareceber", totalValue - newValue);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <InstallmentFields form={form} installmentNumber={2} />
      <InstallmentFields form={form} installmentNumber={3} />
      <InstallmentFields form={form} installmentNumber={4} />
      <InstallmentFields form={form} installmentNumber={5} />
      <InstallmentFields form={form} installmentNumber={6} />
    </>
  );
};

interface InstallmentFieldsProps {
  form: UseFormReturn<PassageiroFormValues>;
  installmentNumber: number;
}

const InstallmentFields = ({ form, installmentNumber }: InstallmentFieldsProps) => {
  const dateFieldName = `dataparcela${installmentNumber}` as keyof PassageiroFormValues;
  const valueFieldName = `valorparcela${installmentNumber}` as keyof PassageiroFormValues;

  return (
    <>
      <FormField
        control={form.control}
        name={dateFieldName}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-inter font-medium">Data Parcela {installmentNumber}</FormLabel>
            <FormControl>
              <MaskedDateInput
                value={field.value}
                onChange={field.onChange}
                placeholder="DD-MM-YYYY"
                className="font-roboto"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={valueFieldName}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-inter font-medium">Valor Parcela {installmentNumber}</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                value={field.value as number}
                className="font-roboto"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default PassageiroPaymentSection;
