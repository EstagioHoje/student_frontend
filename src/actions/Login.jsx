import { ApiGet } from "./server_core/api_get";
import { endpoints } from "./server_core/endpoint";

export const login_student = async (cpf, password) => {
    const endp = endpoints.ALUNO_GET + "/?cpf=" + cpf;
    return await ApiGet(endp)
}