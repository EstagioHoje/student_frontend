import { ApiGet } from "./server_core/api_get";
import { ApiPut } from "./server_core/api_put";
import { ApiPost } from "./server_core/api_post";
import { ApiDelete } from "./server_core/api_delete";
import { endpoints } from "./server_core/endpoint";
import { ApiDelet } from "./server_core/api_delete";

export const assinatura_get_search = async (id) => {
    const endp = endpoints.ASSINATURA_GET + "/?id=" + id;
    return await ApiGet(endp)
}

export const assinatura_get_all_cpf = async (cpf) => {
    const endp = endpoints.ASSINATURA_GET_ALL_CPF + "?cpf=" + cpf;
    return await ApiGet(endp)
}


export const assinatura_get_all = async () => {
    const endp = endpoints.EMPRESA_GET_ALL;
    //const endp = endpoints.ASSINATURA_GET_ALL;
    return await ApiGet(endp)
}

export const assinatura_sign = async (id) => {
    const endp = endpoints.ASSINATURA_SIGN + "?id=" + id;
    return await ApiPut(endp)
}

export const assinatura_reject = async (id,reject_reason) => {
    const endp = endpoints.ASSINATURA_REJECT + "?id=" + id + "&reject_reason=" + reject_reason;
    return await ApiPut(endp)
}