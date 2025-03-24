//src\integrations\supabase\types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      adiantamentos: {
        Row: {
          adiantbrindespara: string | null
          adiantbrindesvalor: number | null
          adiantestacionamentopara: string | null
          adiantestacionamentovalor: number | null
          adiantfretepara: string | null
          adiantfretevalor: number | null
          adianthospedagempara: string | null
          adianthospedagemvalor: number | null
          adiantpasseiospara: string | null
          adiantpasseiosvalor: number | null
          adianttaxaspara: string | null
          adianttaxasvalor: number | null
          adianttrasladospara: string | null
          adianttrasladosvalor: number | null
          created_at: string | null
          id: string
          restantebrindeseextras: number | null
          restanteestacionamento: number | null
          restantefrete: number | null
          restantehospedagem: number | null
          restantepasseios: number | null
          restantetaxas: number | null
          restantetotal: number | null
          restantetraslados: number | null
          totaladiantamentos: number | null
          totaldespesas: number | null
          updated_at: string | null
          user_id: string | null
          valorbrindestotal: number | null
          valorestacionamentototal: number | null
          valorfretetotal: number | null
          valorhospedagemtotal: number | null
          valorpasseiostotal: number | null
          valortaxastotal: number | null
          valortrasladostotal: number | null
        }
        Insert: {
          adiantbrindespara?: string | null
          adiantbrindesvalor?: number | null
          adiantestacionamentopara?: string | null
          adiantestacionamentovalor?: number | null
          adiantfretepara?: string | null
          adiantfretevalor?: number | null
          adianthospedagempara?: string | null
          adianthospedagemvalor?: number | null
          adiantpasseiospara?: string | null
          adiantpasseiosvalor?: number | null
          adianttaxaspara?: string | null
          adianttaxasvalor?: number | null
          adianttrasladospara?: string | null
          adianttrasladosvalor?: number | null
          created_at?: string | null
          id?: string
          restantebrindeseextras?: number | null
          restanteestacionamento?: number | null
          restantefrete?: number | null
          restantehospedagem?: number | null
          restantepasseios?: number | null
          restantetaxas?: number | null
          restantetotal?: number | null
          restantetraslados?: number | null
          totaladiantamentos?: number | null
          totaldespesas?: number | null
          updated_at?: string | null
          user_id?: string | null
          valorbrindestotal?: number | null
          valorestacionamentototal?: number | null
          valorfretetotal?: number | null
          valorhospedagemtotal?: number | null
          valorpasseiostotal?: number | null
          valortaxastotal?: number | null
          valortrasladostotal?: number | null
        }
        Update: {
          adiantbrindespara?: string | null
          adiantbrindesvalor?: number | null
          adiantestacionamentopara?: string | null
          adiantestacionamentovalor?: number | null
          adiantfretepara?: string | null
          adiantfretevalor?: number | null
          adianthospedagempara?: string | null
          adianthospedagemvalor?: number | null
          adiantpasseiospara?: string | null
          adiantpasseiosvalor?: number | null
          adianttaxaspara?: string | null
          adianttaxasvalor?: number | null
          adianttrasladospara?: string | null
          adianttrasladosvalor?: number | null
          created_at?: string | null
          id?: string
          restantebrindeseextras?: number | null
          restanteestacionamento?: number | null
          restantefrete?: number | null
          restantehospedagem?: number | null
          restantepasseios?: number | null
          restantetaxas?: number | null
          restantetotal?: number | null
          restantetraslados?: number | null
          totaladiantamentos?: number | null
          totaldespesas?: number | null
          updated_at?: string | null
          user_id?: string | null
          valorbrindestotal?: number | null
          valorestacionamentototal?: number | null
          valorfretetotal?: number | null
          valorhospedagemtotal?: number | null
          valorpasseiostotal?: number | null
          valortaxastotal?: number | null
          valortrasladostotal?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "adiantamentos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      clientes: {
        Row: {
          bairro: string
          cidade: string
          cpf: string
          created_at: string | null
          datanascimento: string | null
          enderecoembarque: string | null
          id: string
          indicadopor: string | null
          localembarque: string | null
          nome: string
          telefone: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          bairro: string
          cidade: string
          cpf: string
          created_at?: string | null
          datanascimento?: string | null
          enderecoembarque?: string | null
          id?: string
          indicadopor?: string | null
          localembarque?: string | null
          nome: string
          telefone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          bairro?: string
          cidade?: string
          cpf?: string
          created_at?: string | null
          datanascimento?: string | null
          enderecoembarque?: string | null
          id?: string
          indicadopor?: string | null
          localembarque?: string | null
          nome?: string
          telefone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clientes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      passageiros: {
        Row: {
          bairropassageiro: string | null
          cidadepassageiro: string | null
          cpfpassageiro: string
          created_at: string | null
          datapagamentoavista: string | null
          dataparcela10: string | null
          dataparcela11: string | null
          dataparcela12: string | null
          dataparcela2: string | null
          dataparcela3: string | null
          dataparcela4: string | null
          dataparcela5: string | null
          dataparcela6: string | null
          dataparcela7: string | null
          dataparcela8: string | null
          dataparcela9: string | null
          datasinal: string | null
          dataviagem: string
          enderecoembarquepassageiro: string | null
          formapagamentoavista: string | null
          id: string
          localembarquepassageiro: string | null
          nomepassageiro: string
          nomeviagem: string
          pagamentoavista: boolean | null
          passageiroindicadopor: string | null
          telefonepassageiro: string | null
          updated_at: string | null
          user_id: string | null
          valorfaltareceber: number | null
          valorparcela10: number | null
          valorparcela11: number | null
          valorparcela12: number | null
          valorparcela2: number | null
          valorparcela3: number | null
          valorparcela4: number | null
          valorparcela5: number | null
          valorparcela6: number | null
          valorparcela7: number | null
          valorparcela8: number | null
          valorparcela9: number | null
          valorsinal: number | null
          valorviagem: number
        }
        Insert: {
          bairropassageiro?: string | null
          cidadepassageiro?: string | null
          cpfpassageiro: string
          created_at?: string | null
          datapagamentoavista?: string | null
          dataparcela10?: string | null
          dataparcela11?: string | null
          dataparcela12?: string | null
          dataparcela2?: string | null
          dataparcela3?: string | null
          dataparcela4?: string | null
          dataparcela5?: string | null
          dataparcela6?: string | null
          dataparcela7?: string | null
          dataparcela8?: string | null
          dataparcela9?: string | null
          datasinal?: string | null
          dataviagem: string
          enderecoembarquepassageiro?: string | null
          formapagamentoavista?: string | null
          id?: string
          localembarquepassageiro?: string | null
          nomepassageiro: string
          nomeviagem: string
          pagamentoavista?: boolean | null
          passageiroindicadopor?: string | null
          telefonepassageiro?: string | null
          updated_at?: string | null
          user_id?: string | null
          valorfaltareceber?: number | null
          valorparcela10?: number | null
          valorparcela11?: number | null
          valorparcela12?: number | null
          valorparcela2?: number | null
          valorparcela3?: number | null
          valorparcela4?: number | null
          valorparcela5?: number | null
          valorparcela6?: number | null
          valorparcela7?: number | null
          valorparcela8?: number | null
          valorparcela9?: number | null
          valorsinal?: number | null
          valorviagem: number
        }
        Update: {
          bairropassageiro?: string | null
          cidadepassageiro?: string | null
          cpfpassageiro?: string
          created_at?: string | null
          datapagamentoavista?: string | null
          dataparcela10?: string | null
          dataparcela11?: string | null
          dataparcela12?: string | null
          dataparcela2?: string | null
          dataparcela3?: string | null
          dataparcela4?: string | null
          dataparcela5?: string | null
          dataparcela6?: string | null
          dataparcela7?: string | null
          dataparcela8?: string | null
          dataparcela9?: string | null
          datasinal?: string | null
          dataviagem?: string
          enderecoembarquepassageiro?: string | null
          formapagamentoavista?: string | null
          id?: string
          localembarquepassageiro?: string | null
          nomepassageiro?: string
          nomeviagem?: string
          pagamentoavista?: boolean | null
          passageiroindicadopor?: string | null
          telefonepassageiro?: string | null
          updated_at?: string | null
          user_id?: string | null
          valorfaltareceber?: number | null
          valorparcela10?: number | null
          valorparcela11?: number | null
          valorparcela12?: number | null
          valorparcela2?: number | null
          valorparcela3?: number | null
          valorparcela4?: number | null
          valorparcela5?: number | null
          valorparcela6?: number | null
          valorparcela7?: number | null
          valorparcela8?: number | null
          valorparcela9?: number | null
          valorsinal?: number | null
          valorviagem?: number
        }
        Relationships: [
          {
            foreignKeyName: "passageiros_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      pedidosdeacesso: {
        Row: {
          created_at: string | null
          email: string
          id: string
          motivo: string | null
          nome: string
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          motivo?: string | null
          nome: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          motivo?: string | null
          nome?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pedidosdeacesso_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          created_at: string | null
          email: string
          funcao: string
          id: string
          nome: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          funcao: string
          id?: string
          nome: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          funcao?: string
          id?: string
          nome?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      viagens: {
        Row: {
          brindesdescricao: string | null
          brindeseextrasobservacao: string | null
          brindestotal: number | null
          brindesunitario: number | null
          cidadesvisitar: string | null
          contatoempresa: string | null
          contatohospedagem: string | null
          created_at: string | null
          datapartida: string
          dataretorno: string
          descricaopasseios1: string | null
          descricaopasseios2: string | null
          descricaopasseios3: string | null
          deslocamentomotoristaunitario: number | null
          despesatotal: number | null
          destino: string
          empresatransporte: string
          estacionamento: number | null
          extras1descricao: string | null
          extras1valor: number | null
          extras2descricao: string | null
          extras2valor: number | null
          extras3descricao: string | null
          extras3valor: number | null
          frete: number | null
          hospedagemobservacao: string | null
          id: string
          lucrobruto: number | null
          motoristasobservacao: string | null
          nomehospedagem: string | null
          outrasreceitas1descricao: string | null
          outrasreceitas1valor: number | null
          outrasreceitas2descricao: string | null
          outrasreceitas2valor: number | null
          outrastaxasdescricao: string | null
          outrastaxasvalor: number | null
          outrosservicosdescricao: string | null
          outrosservicosvalor: number | null
          passeiosobservacao: string | null
          pontoequilibrio: number | null
          precosugerido: number | null
          qtdealmocosmotoristas: number | null
          qtdeassentos: number
          qtdebrindes: number | null
          qtdedeslocamentosmotoristas: number | null
          qtdediarias: number | null
          qtdehospedes: number | null
          qtdejantasmotoristas: number | null
          qtdemotoristas: number
          qtdenaopagantes: number
          qtdepagantes: number
          qtdepasseios1: number | null
          qtdepasseios2: number | null
          qtdepasseios3: number | null
          qtdepromocionais: number
          qtdereservadosguias: number
          qtdetraslado1: number | null
          qtdetraslado2: number | null
          qtdetraslado3: number | null
          receitatotal: number | null
          refeicaomotoristaunitario: number | null
          regimehospedagem: string | null
          sorteio1descricao: string | null
          sorteio1qtde: number | null
          sorteio1valor: number | null
          sorteio2descricao: string | null
          sorteio2qtde: number | null
          sorteio2valor: number | null
          sorteio3descricao: string | null
          sorteio3qtde: number | null
          sorteio3valor: number | null
          taxacidade: number | null
          taxaguialocal: number | null
          taxasobservacao: string | null
          telefoneempresa: string | null
          telefonehospedagem: string | null
          tipohospedagem: string | null
          tipoveiculo: string
          totaldeslocamentosmotoristas: number | null
          totaldespesasbrindeesextras: number | null
          totaldespesashospedagem: number | null
          totaldespesasmotoristas: number | null
          totaldespesaspasseios: number | null
          totaldespesassorteios: number | null
          totaldespesastransporte: number | null
          totaldiarias: number | null
          totaloutrasreceitas: number | null
          totalrefeicaomotorista: number | null
          totaltaxas: number | null
          totaltraslados: number | null
          traslado1descricao: string | null
          traslado1valor: number | null
          traslado2descricao: string | null
          traslado2valor: number | null
          traslado3descricao: string | null
          traslado3valor: number | null
          updated_at: string | null
          user_id: string | null
          valordiariaunitario: number | null
          valorpasseios1: number | null
          valorpasseios2: number | null
          valorpasseios3: number | null
        }
        Insert: {
          brindesdescricao?: string | null
          brindeseextrasobservacao?: string | null
          brindestotal?: number | null
          brindesunitario?: number | null
          cidadesvisitar?: string | null
          contatoempresa?: string | null
          contatohospedagem?: string | null
          created_at?: string | null
          datapartida: string
          dataretorno: string
          descricaopasseios1?: string | null
          descricaopasseios2?: string | null
          descricaopasseios3?: string | null
          deslocamentomotoristaunitario?: number | null
          despesatotal?: number | null
          destino: string
          empresatransporte: string
          estacionamento?: number | null
          extras1descricao?: string | null
          extras1valor?: number | null
          extras2descricao?: string | null
          extras2valor?: number | null
          extras3descricao?: string | null
          extras3valor?: number | null
          frete?: number | null
          hospedagemobservacao?: string | null
          id?: string
          lucrobruto?: number | null
          motoristasobservacao?: string | null
          nomehospedagem?: string | null
          outrasreceitas1descricao?: string | null
          outrasreceitas1valor?: number | null
          outrasreceitas2descricao?: string | null
          outrasreceitas2valor?: number | null
          outrastaxasdescricao?: string | null
          outrastaxasvalor?: number | null
          outrosservicosdescricao?: string | null
          outrosservicosvalor?: number | null
          passeiosobservacao?: string | null
          pontoequilibrio?: number | null
          precosugerido?: number | null
          qtdealmocosmotoristas?: number | null
          qtdeassentos?: number
          qtdebrindes?: number | null
          qtdedeslocamentosmotoristas?: number | null
          qtdediarias?: number | null
          qtdehospedes?: number | null
          qtdejantasmotoristas?: number | null
          qtdemotoristas?: number
          qtdenaopagantes?: number
          qtdepagantes?: number
          qtdepasseios1?: number | null
          qtdepasseios2?: number | null
          qtdepasseios3?: number | null
          qtdepromocionais?: number
          qtdereservadosguias?: number
          qtdetraslado1?: number | null
          qtdetraslado2?: number | null
          qtdetraslado3?: number | null
          receitatotal?: number | null
          refeicaomotoristaunitario?: number | null
          regimehospedagem?: string | null
          sorteio1descricao?: string | null
          sorteio1qtde?: number | null
          sorteio1valor?: number | null
          sorteio2descricao?: string | null
          sorteio2qtde?: number | null
          sorteio2valor?: number | null
          sorteio3descricao?: string | null
          sorteio3qtde?: number | null
          sorteio3valor?: number | null
          taxacidade?: number | null
          taxaguialocal?: number | null
          taxasobservacao?: string | null
          telefoneempresa?: string | null
          telefonehospedagem?: string | null
          tipohospedagem?: string | null
          tipoveiculo: string
          totaldeslocamentosmotoristas?: number | null
          totaldespesasbrindeesextras?: number | null
          totaldespesashospedagem?: number | null
          totaldespesasmotoristas?: number | null
          totaldespesaspasseios?: number | null
          totaldespesassorteios?: number | null
          totaldespesastransporte?: number | null
          totaldiarias?: number | null
          totaloutrasreceitas?: number | null
          totalrefeicaomotorista?: number | null
          totaltaxas?: number | null
          totaltraslados?: number | null
          traslado1descricao?: string | null
          traslado1valor?: number | null
          traslado2descricao?: string | null
          traslado2valor?: number | null
          traslado3descricao?: string | null
          traslado3valor?: number | null
          updated_at?: string | null
          user_id?: string | null
          valordiariaunitario?: number | null
          valorpasseios1?: number | null
          valorpasseios2?: number | null
          valorpasseios3?: number | null
        }
        Update: {
          brindesdescricao?: string | null
          brindeseextrasobservacao?: string | null
          brindestotal?: number | null
          brindesunitario?: number | null
          cidadesvisitar?: string | null
          contatoempresa?: string | null
          contatohospedagem?: string | null
          created_at?: string | null
          datapartida?: string
          dataretorno?: string
          descricaopasseios1?: string | null
          descricaopasseios2?: string | null
          descricaopasseios3?: string | null
          deslocamentomotoristaunitario?: number | null
          despesatotal?: number | null
          destino?: string
          empresatransporte?: string
          estacionamento?: number | null
          extras1descricao?: string | null
          extras1valor?: number | null
          extras2descricao?: string | null
          extras2valor?: number | null
          extras3descricao?: string | null
          extras3valor?: number | null
          frete?: number | null
          hospedagemobservacao?: string | null
          id?: string
          lucrobruto?: number | null
          motoristasobservacao?: string | null
          nomehospedagem?: string | null
          outrasreceitas1descricao?: string | null
          outrasreceitas1valor?: number | null
          outrasreceitas2descricao?: string | null
          outrasreceitas2valor?: number | null
          outrastaxasdescricao?: string | null
          outrastaxasvalor?: number | null
          outrosservicosdescricao?: string | null
          outrosservicosvalor?: number | null
          passeiosobservacao?: string | null
          pontoequilibrio?: number | null
          precosugerido?: number | null
          qtdealmocosmotoristas?: number | null
          qtdeassentos?: number
          qtdebrindes?: number | null
          qtdedeslocamentosmotoristas?: number | null
          qtdediarias?: number | null
          qtdehospedes?: number | null
          qtdejantasmotoristas?: number | null
          qtdemotoristas?: number
          qtdenaopagantes?: number
          qtdepagantes?: number
          qtdepasseios1?: number | null
          qtdepasseios2?: number | null
          qtdepasseios3?: number | null
          qtdepromocionais?: number
          qtdereservadosguias?: number
          qtdetraslado1?: number | null
          qtdetraslado2?: number | null
          qtdetraslado3?: number | null
          receitatotal?: number | null
          refeicaomotoristaunitario?: number | null
          regimehospedagem?: string | null
          sorteio1descricao?: string | null
          sorteio1qtde?: number | null
          sorteio1valor?: number | null
          sorteio2descricao?: string | null
          sorteio2qtde?: number | null
          sorteio2valor?: number | null
          sorteio3descricao?: string | null
          sorteio3qtde?: number | null
          sorteio3valor?: number | null
          taxacidade?: number | null
          taxaguialocal?: number | null
          taxasobservacao?: string | null
          telefoneempresa?: string | null
          telefonehospedagem?: string | null
          tipohospedagem?: string | null
          tipoveiculo?: string
          totaldeslocamentosmotoristas?: number | null
          totaldespesasbrindeesextras?: number | null
          totaldespesashospedagem?: number | null
          totaldespesasmotoristas?: number | null
          totaldespesaspasseios?: number | null
          totaldespesassorteios?: number | null
          totaldespesastransporte?: number | null
          totaldiarias?: number | null
          totaloutrasreceitas?: number | null
          totalrefeicaomotorista?: number | null
          totaltaxas?: number | null
          totaltraslados?: number | null
          traslado1descricao?: string | null
          traslado1valor?: number | null
          traslado2descricao?: string | null
          traslado2valor?: number | null
          traslado3descricao?: string | null
          traslado3valor?: number | null
          updated_at?: string | null
          user_id?: string | null
          valordiariaunitario?: number | null
          valorpasseios1?: number | null
          valorpasseios2?: number | null
          valorpasseios3?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "viagens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
