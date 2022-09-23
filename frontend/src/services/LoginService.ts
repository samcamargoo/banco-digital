import axios from "axios"
import { LoginUsuario } from "../models/LoginUsuario"

const API_URL = "http://localhost:8080/api/v1/login"

export function loginDeUsuario(cliente: LoginUsuario) {
    return axios.post(API_URL, cliente);
}