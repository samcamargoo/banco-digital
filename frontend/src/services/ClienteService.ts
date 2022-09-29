import { api } from './Api';
import axios from 'axios';
import { TiArrowMaximiseOutline } from 'react-icons/ti';
import { CadastroUsuario } from './../models/CadastroUsuario';

const API_URL = "http://localhost:8080/api/v1/clientes"

export function cadastrarCliente(cliente: CadastroUsuario) {
    return api.post<CadastroUsuario>(API_URL, cliente);
}

export function checarCpfExistente(cpf: string) {
    return api.get(API_URL + "/verificar-cpf?cpf=" + cpf);
}

export function checarEmailExistente(email: string) {
    return api.get(API_URL + "/verificar-email?email=" + email);
}

export function listarInfoCliente(email: string) {
    return api.get(API_URL + "/cliente-info?email=" + email);
}