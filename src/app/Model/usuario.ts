import { Profissao } from './profissao';
import { ContaUser } from './conta-user';
import { Formacao } from './formacao';
import { CartaoPagamento } from './cartao-pagamento';
import { ContaRecebimento } from './conta-recebimento';

export class Usuario {

    
    idUser?: string;
    nome?: string;
    sobrenome?: string;
    cpf?: string;
    telefone?: string;
    pais?:string;
    localidade?:string;
    estado?:string;
    cnpj?: string;
    idade?: number;
    email?: string;
    senha?: string;
    status?: boolean;
    statusPerfilProfissional?: string;
    statusPerfilPessoal?: string;
    profissao?: Profissao;
    formacao?: Formacao;
    cartaoPagamento?: CartaoPagamento;
    contaRecebimento?: ContaRecebimento;
    notaUsuario?: number;
    foto?: string;
}
