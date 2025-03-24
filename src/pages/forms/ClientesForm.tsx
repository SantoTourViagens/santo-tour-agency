// src\pages\forms\ClientesForm.tsx
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { maskCPF, maskPhone, maskDate, unmask } from "@/utils/masks";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const clienteFormSchema = z.object({
  cpf: z.string()
    .min(11, { message: "CPF deve ter 11 dígitos" })
    .max(14, { message: "CPF deve ter 11 dígitos" })
    .transform(unmask),
  nome: z.string()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" })
    .max(50, { message: "Nome deve ter no máximo 50 caracteres" }),
  telefone: z.string()
    .max(15, { message: "Telefone deve ter no máximo 11 dígitos" })
    .transform((val) => val ? unmask(val) : null)
    .optional()
    .nullable(),
  datanascimento: z.string()
    .max(10, { message: "Data deve estar no formato DD/MM/AAAA" })
    .transform((val) => {
      if (!val) return null;
      const cleaned = unmask(val);
      if (!cleaned) return null;
      const day = cleaned.slice(0, 2);
      const month = cleaned.slice(2, 4);
      const year = cleaned.slice(4, 8);
      return `${year}-${month}-${day}T00:00:00`;
    })
    .optional()
    .nullable(),
  bairro: z.string()
    .min(2, { message: "Bairro deve ter pelo menos 2 caracteres" })
    .max(50, { message: "Bairro deve ter no máximo 50 caracteres" }),
  cidade: z.string()
    .min(2, { message: "Cidade deve ter pelo menos 2 caracteres" })
    .max(50, { message: "Cidade deve ter no máximo 50 caracteres" }),
  localembarque: z.string()
    .max(50, { message: "Local de embarque deve ter no máximo 50 caracteres" })
    .optional()
    .nullable(),
  enderecoembarque: z.string()
    .max(100, { message: "Endereço de embarque deve ter no máximo 100 caracteres" })
    .optional()
    .nullable(),
  indicadopor: z.string().optional(),
});

type ClienteFormValues = z.infer<typeof clienteFormSchema>;

const ClientesForm = () => {
  const { toast } = useToast();
  const [nomeindicadopor, setnomeindicadopor] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ClienteFormValues>({
    resolver: zodResolver(clienteFormSchema),
    defaultValues: {
      cpf: "",
      nome: "",
      telefone: "",
      datanascimento: "",
      bairro: "",
      cidade: "",
      localembarque: "",
      enderecoembarque: "",
      indicadopor: "",
    },
  });

  const onSubmit = async (data: ClienteFormValues) => {
    try {
      const defaultUserId = "4e7df60e-8b5c-4a66-b12a-4e089c470d16";
      let userId = defaultUserId;

      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (!authError && authData?.user) {
        const { data: usuarioData, error: usuarioError } = await supabase
          .from('usuarios')
          .select('id')
          .eq('email', authData.user.email)
          .single();

        if (usuarioError || !usuarioData) {
          console.warn("Usuário não encontrado em 'usuarios', usando user_id padrão:", defaultUserId);
        } else {
          userId = usuarioData.id;
        }
      } else {
        console.warn("Nenhum usuário autenticado, usando user_id padrão:", defaultUserId);
      }

      const clienteData = {
        cpf: data.cpf,
        nome: data.nome,
        telefone: data.telefone,
        datanascimento: data.datanascimento,
        bairro: data.bairro,
        cidade: data.cidade,
        localembarque: data.localembarque || null,
        enderecoembarque: data.enderecoembarque || null,
        indicadopor: data.indicadopor || null,
        user_id: userId,
      };

      if (isEditing) {
        const { error } = await supabase
          .from('clientes')
          .update(clienteData)
          .eq('cpf', data.cpf);

        if (error) throw error;

        toast({
          title: "Alterações salvas com sucesso!",
          description: "Os dados do cliente foram atualizados no banco de dados.",
        });
      } else {
        const { error } = await supabase
          .from('clientes')
          .insert(clienteData);

        if (error) throw error;

        toast({
          title: "Cliente cadastrado com sucesso!",
          description: "Os dados foram salvos no banco de dados.",
        });
      }

      form.reset();
      setnomeindicadopor("");
      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: isEditing ? "Erro ao salvar alterações" : "Erro ao cadastrar cliente",
        description: error.message || "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    }
  };

  const buscarIndicador = async (cpf: string) => {
    if (cpf.length < 11) {
      setnomeindicadopor("");
      return;
    }

    const cpfNumerico = unmask(cpf);

    if (cpfNumerico.length === 11) {
      try {
        const { data, error } = await supabase
          .from('clientes')
          .select('nome')
          .eq('cpf', cpfNumerico)
          .single();

        if (error) {
          setnomeindicadopor("");
          return;
        }

        if (data) {
          setnomeindicadopor(data.nome);
        } else {
          setnomeindicadopor("");
        }
      } catch (error) {
        setnomeindicadopor("");
      }
    }
  };

  const buscarClientePorNome = async (nome: string) => {
    if (nome.length < 3) {
      return;
    }

    try {
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .ilike('nome', `%${nome}%`)
        .limit(1);

      if (error || !data || data.length === 0) {
        return;
      }

      if (data && data.length > 0) {
        setIsEditing(true);
        form.reset({
          cpf: maskCPF(data[0].cpf),
          nome: data[0].nome,
          telefone: maskPhone(data[0].telefone),
          datanascimento: data[0].datanascimento ? format(new Date(`${data[0].datanascimento}T00:00:00`), 'dd/MM/yyyy') : "",
          bairro: data[0].bairro,
          cidade: data[0].cidade,
          localembarque: data[0].localembarque,
          enderecoembarque: data[0].enderecoembarque,
          indicadopor: data[0].indicadopor ? maskCPF(data[0].indicadopor) : "",
        });

        if (data[0].indicadopor) {
          await buscarIndicador(data[0].indicadopor);
        }

        toast({
          title: "Cliente encontrado",
          description: "Os dados foram carregados automaticamente.",
        });
      }
    } catch (error) {
      console.error("Erro ao buscar cliente pelo nome:", error);
    }
  };

  const buscarCliente = async (cpf: string) => {
    if (cpf.length < 11) {
      setIsEditing(false);
      form.reset({
        cpf: cpf,
        nome: "",
        telefone: "",
        datanascimento: "",
        bairro: "",
        cidade: "",
        localembarque: "",
        enderecoembarque: "",
        indicadopor: "",
      });
      setnomeindicadopor("");
      return;
    }

    const cpfNumerico = unmask(cpf);

    if (cpfNumerico.length === 11) {
      try {
        const { data, error } = await supabase
          .from('clientes')
          .select('*')
          .eq('cpf', cpfNumerico)
          .single();

        if (error) {
          setIsEditing(false);
          form.reset({
            cpf: maskCPF(cpfNumerico),
            nome: "",
            telefone: "",
            datanascimento: "",
            bairro: "",
            cidade: "",
            localembarque: "",
            enderecoembarque: "",
            indicadopor: "",
          });
          setnomeindicadopor("");
          return;
        }

        if (data) {
          setIsEditing(true);
          form.reset({
            cpf: maskCPF(data.cpf),
            nome: data.nome,
            telefone: maskPhone(data.telefone),
            datanascimento: format(new Date(`${data.datanascimento}T00:00:00`), 'dd/MM/yyyy'),
            bairro: data.bairro,
            cidade: data.cidade,
            localembarque: data.localembarque,
            enderecoembarque: data.enderecoembarque,
            indicadopor: data.indicadopor ? maskCPF(data.indicadopor) : "",
          });

          if (data.indicadopor) {
            await buscarIndicador(data.indicadopor);
          }

          toast({
            title: "Cliente encontrado",
            description: "Os dados foram carregados automaticamente.",
          });
        }
      } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        setIsEditing(false);
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <Card className="w-full">
          <CardHeader className="bg-navy text-white">
            <CardTitle className="text-xl font-inter">Cadastro de Clientes</CardTitle>
            <CardDescription className="text-gray-200 font-roboto">
              Preencha os dados do cliente
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-inter font-medium">CPF</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="000.000.000-00"
                            value={maskCPF(field.value)}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              buscarCliente(e.target.value);
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
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-inter font-medium">Nome Completo</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nome completo"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              if (e.target.value.length >= 3) {
                                buscarClientePorNome(e.target.value);
                              }
                            }}
                            maxLength={50}
                            className="font-roboto"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="telefone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-inter font-medium">Telefone (opcional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(00) 00000-0000"
                            value={maskPhone(field.value || "")}
                            onChange={(e) => field.onChange(e.target.value)}
                            maxLength={15}
                            className="font-roboto"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="datanascimento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-inter font-medium">Data de Nascimento (opcional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="DD/MM/AAAA"
                            value={maskDate(field.value || "")}
                            onChange={(e) => field.onChange(e.target.value)}
                            maxLength={10}
                            className="font-roboto"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bairro"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-inter font-medium">Bairro</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Bairro"
                            {...field}
                            maxLength={50}
                            className="font-roboto"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-inter font-medium">Cidade</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Cidade"
                            {...field}
                            maxLength={50}
                            className="font-roboto"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="localembarque"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-inter font-medium">Local de Embarque (opcional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Local de embarque"
                            {...field}
                            value={field.value || ""}
                            maxLength={50}
                            className="font-roboto"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="enderecoembarque"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-inter font-medium">Endereço de Embarque (opcional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Endereço de embarque"
                            {...field}
                            value={field.value || ""}
                            maxLength={100}
                            className="font-roboto"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="indicadopor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-inter font-medium">Indicado por (CPF)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="000.000.000-00"
                            value={maskCPF(field.value || "")}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              buscarIndicador(e.target.value);
                            }}
                            maxLength={14}
                            className="font-roboto"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col space-y-1.5">
                    <label className="font-inter font-medium text-sm">Indicado por (Nome)</label>
                    <Input
                      value={nomeindicadopor}
                      readOnly
                      disabled
                      className="font-roboto bg-gray-100"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-navy hover:bg-navy/90 font-inter"
                  >
                    {isEditing ? "Salvar Alterações" : "Cadastrar Cliente"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ClientesForm;
