import { BoletoEmail } from '../models/BoletoEmail';
import { api } from './Api';

const API_URL = "http://localhost:8080/api/v1/email"

export function enviarBoletoEmail(boletoEmail: BoletoEmail) {
    return api.post(API_URL, boletoEmail)
}