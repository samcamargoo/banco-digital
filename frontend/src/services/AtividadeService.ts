import { Atividade } from './../models/Atividade';
import { api } from "./Api";


const API_URL = "http://localhost:8080/api/v1/atividades"



export function getAtividades(email: string) {
    return api.get(API_URL + "?email="+email);
}

