import { ApiGet } from "./server_core/api_get";
import { ApiPut } from "./server_core/api_put";
import { ApiPost } from "./server_core/api_post";
import { ApiDelete } from "./server_core/api_delete";
import { endpoints } from "./server_core/endpoint";
import { ApiDelet } from "./server_core/api_delete";

export const relatorio_get_search = async (id) => {
    const endp = endpoints.RELATORIO_GET + "/?id=" + id;
    return await ApiGet(endp)
}

export const relatorio_get_all_cpf = async (cpf) => {
    //const endp = endpoints.VAGA_GET_ALL;
    const endp = endpoints.RELATORIO_GET_ALL_CPF + "?cpf=" + cpf;
    console.log(endp)
    return await ApiGet(endp)
}

export const relatorio_post = async (id,report) => {
    const endp = endpoints.RELATORIO_POST;
    const data = {
        id: id,
        report: report,
    }
    console.log(data)
    //return await ApiPost(endp, data)
}