
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { maskCPF, maskPhone } from "@/utils/masks";
import { UseFormReturn } from "react-hook-form";
import { PassageiroFormValues } from "./types";

interface PassageiroPersonalInfoSectionProps {
  form: UseFormReturn<PassageiroFormValues>;
  listaViagens: { value: string; label: string }[];
  handleViagemChange: (viagemId: string) => Promise<void>;
  handleCPFChange: (cpf: string) => Promise<void>;
}

const PassageiroPersonalInfoSection = ({
  form,
  listaViagens,
  handleViagemChange,
  handleCPFChange,
}: PassageiroPersonalInfoSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="idviagem"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-inter font-medium">Viagem</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                handleViagemChange(value);
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a viagem" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {listaViagens.map((viagem) => (
                  <SelectItem key={viagem.value} value={viagem.value}>
                    {viagem.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cpfpassageiro"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-inter font-medium">CPF</FormLabel>
            <FormControl>
              <Input
                placeholder="000.000.000-00"
                {...field}
                value={maskCPF(field.value)}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  handleCPFChange(e.target.value);
                }}
                maxLength={14}
                className="font-roboto"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="nomepassageiro"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-inter font-medium">Nome</FormLabel>
            <FormControl>
              <Input
                placeholder="Nome completo"
                {...field}
                maxLength={50}
                className="font-roboto bg-gray-100"
                disabled
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="telefonepassageiro"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-inter font-medium">Telefone</FormLabel>
            <FormControl>
              <Input
                placeholder="(00) 00000-0000"
                value={maskPhone(field.value)}
                onChange={(e) => field.onChange(e.target.value)}
                maxLength={15}
                className="font-roboto bg-gray-100"
                disabled
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="bairropassageiro"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-inter font-medium">Bairro</FormLabel>
            <FormControl>
              <Input
                placeholder="Bairro"
                {...field}
                maxLength={50}
                className="font-roboto bg-gray-100"
                disabled
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cidadepassageiro"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-inter font-medium">Cidade</FormLabel>
            <FormControl>
              <Input
                placeholder="Cidade"
                {...field}
                maxLength={50}
                className="font-roboto bg-gray-100"
                disabled
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="localembarquepassageiro"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-inter font-medium">Local de Embarque</FormLabel>
            <FormControl>
              <Input
                placeholder="Local de embarque"
                {...field}
                maxLength={50}
                className="font-roboto bg-gray-100"
                disabled
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="enderecoembarquepassageiro"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-inter font-medium">Endereço de Embarque</FormLabel>
            <FormControl>
              <Input
                placeholder="Endereço de embarque"
                {...field}
                maxLength={100}
                className="font-roboto bg-gray-100"
                disabled
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="valorviagem"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-inter font-medium">Valor da Viagem</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                className="font-roboto bg-gray-100"
                disabled
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="passageiroindicadopor"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-inter font-medium">Indicado por</FormLabel>
            <FormControl>
              <Input
                placeholder="Nome de quem indicou"
                {...field}
                maxLength={50}
                className="font-roboto bg-gray-100"
                disabled
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PassageiroPersonalInfoSection;
