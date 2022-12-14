import  axios  from 'axios';
import { GerarBoletoType } from '../models/GerarBoleto';
import { PagarBoleto } from '../models/PagarBoleto';
import { api } from './Api';

const API_URL = "http://localhost:8080/api/v1/boletos"

export function getBoleto(barcode: string) {
    return api.get(API_URL + "/?codigoDeBarras=" +barcode);
}

export function pagarBoleto(boleto: PagarBoleto) {
    return api.post(API_URL + "/pagar-boleto", boleto);
}

export function gerarBoleto(boleto: GerarBoletoType) {
    return api.post(API_URL, boleto)
}