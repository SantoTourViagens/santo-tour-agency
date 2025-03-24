
import { z } from "zod";

// Define PassageiroSchema for strong typing
export const passageiroSchema = z.object({
  nomeviagem: z.string().optional(),
  idviagem: z.string().optional(),
  valorviagem: z.coerce.number().min(0).default(0),
  dataviagem: z.string(),
  cpfpassageiro: z.string()
    .min(11, { message: "CPF deve ter 11 dígitos" })
    .max(14, { message: "CPF deve ter 14 dígitos" })
    .transform((val) => val.replace(/\D/g, "")),
  nomepassageiro: z.string()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" })
    .max(50, { message: "Nome deve ter no máximo 50 caracteres" }),
  telefonepassageiro: z.string()
    .min(10, { message: "Telefone deve ter pelo menos 10 dígitos" })
    .max(15, { message: "Telefone deve ter no máximo 15 dígitos" })
    .transform((val) => val.replace(/\D/g, "")),
  bairropassageiro: z.string()
    .min(2, { message: "Bairro deve ter pelo menos 2 caracteres" })
    .max(50, { message: "Bairro deve ter no máximo 50 caracteres" }),
  cidadepassageiro: z.string()
    .min(2, { message: "Cidade deve ter pelo menos 2 caracteres" })
    .max(50, { message: "Cidade deve ter no máximo 50 caracteres" }),
  localembarquepassageiro: z.string()
    .min(2, { message: "Local de embarque deve ter pelo menos 2 caracteres" })
    .max(50, { message: "Local de embarque deve ter no máximo 50 caracteres" }),
  enderecoembarquepassageiro: z.string()
    .min(2, { message: "Endereço de embarque deve ter pelo menos 2 caracteres" })
    .max(100, { message: "Endereço de embarque deve ter no máximo 100 caracteres" }),
  passageiroindicadopor: z.string().max(50).optional().or(z.literal("")),
  pagamentoavista: z.boolean().default(true),
  datapagamentoavista: z.string().optional().or(z.literal("")),
  formapagamentoavista: z.enum(["Dinheiro", "Crédito", "Débito", "PIX"]),
  valorfaltareceber: z.coerce.number().min(0).default(0),
  datasinal: z.string().optional().or(z.literal("")),
  valorsinal: z.coerce.number().min(0).default(0),
  dataparcela2: z.string().optional().or(z.literal("")),
  valorparcela2: z.coerce.number().min(0).default(0),
  dataparcela3: z.string().optional().or(z.literal("")),
  valorparcela3: z.coerce.number().min(0).default(0),
  dataparcela4: z.string().optional().or(z.literal("")),
  valorparcela4: z.coerce.number().min(0).default(0),
  dataparcela5: z.string().optional().or(z.literal("")),
  valorparcela5: z.coerce.number().min(0).default(0),
  dataparcela6: z.string().optional().or(z.literal("")),
  valorparcela6: z.coerce.number().min(0).default(0),
  dataparcela7: z.string().optional().or(z.literal("")),
  valorparcela7: z.coerce.number().min(0).default(0),
  dataparcela8: z.string().optional().or(z.literal("")),
  valorparcela8: z.coerce.number().min(0).default(0),
  dataparcela9: z.string().optional().or(z.literal("")),
  valorparcela9: z.coerce.number().min(0).default(0),
  dataparcela10: z.string().optional().or(z.literal("")),
  valorparcela10: z.coerce.number().min(0).default(0),
  dataparcela11: z.string().optional().or(z.literal("")),
  valorparcela11: z.coerce.number().min(0).default(0),
  dataparcela12: z.string().optional().or(z.literal("")),
  valorparcela12: z.coerce.number().min(0).default(0),
});

export type PassageiroFormValues = z.infer<typeof passageiroSchema>;
