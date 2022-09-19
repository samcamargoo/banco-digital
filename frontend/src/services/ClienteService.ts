import axios from 'axios';
import { TiArrowMaximiseOutline } from 'react-icons/ti';
import { CadastroUsuario } from './../models/CadastroUsuario';

const API_URL = "http://localhost:8080/api/v1/clientes"

export function cadastrarCliente(cliente: CadastroUsuario) {
    return axios.post<CadastroUsuario>(API_URL, cliente);
}

export function checarCpfExistente(cpf: string) {
    return axios.get(API_URL + "/verificar-cpf?cpf=" + cpf);
}

export function checarEmailExistente(email: string) {
    return axios.get(API_URL + "/verificar-email?email=" + email);
}