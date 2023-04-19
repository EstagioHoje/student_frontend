import { ApiGet } from "./server_core/api_get";
import { ApiPut } from "./server_core/api_put";
import { ApiPost } from "./server_core/api_post";
import { ApiDelete } from "./server_core/api_delete";
import { endpoints } from "./server_core/endpoint";

export const vaga_get_search = async (id) => {
    const endp = endpoints.VAGA_GET + "/?id=" + id;
    return await ApiGet(endp)
}

export const vaga_get_all = async () => {
    const endp = endpoints.VAGA_GET_ALL;
    return await ApiGet(endp)
}

// export const vaga_post = async (
//     role,
//     weekly_hours,
//     physicality,
//     vacancies,
//     salary,
//     description,
//     requirements
// ) => {
//     const endp = endpoints.VAGA_POST;
//     const data = {
//         role: role,
//         weekly_hours: weekly_hours,
//         physicality: physicality,
//         vacancies: vacancies,
//         salary: salary,
//         description: description,
//         requirements: requirements
//     }
//     return await ApiPost(endp, data)
// }

export const vaga_apply = async (cpf, id) => {
    const endp = endpoints.VAGA_APPLY + "/?id_vacancy=" + id + "&cpf=" + cpf;
    return await ApiPut(endp)
}

// export const vaga_put = async (role, weekly_hours, physicality,
//     vacancies, salary, description, requirements) => {
//     const endp = endpoints.VAGA_PUT;
//     const data = {
//         role: role,
//         weekly_hours: weekly_hours,
//         physicality: physicality,
//         vacancies: vacancies,
//         salary: salary,
//         description: description,
//         requirements: requirements
//     }
//     return await ApiPut(endp, data)
// }

export const vaga_delete = async (id) => {
    const endp = endpoints.VAGA_DELETE + "/?id=" + id;
    return await ApiDelete(endp)
}