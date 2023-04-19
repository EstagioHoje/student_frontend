import { ApiGet } from "./server_core/api_get";
import { ApiPut } from "./server_core/api_put";
import { ApiPost } from "./server_core/api_post";
import { ApiDelete } from "./server_core/api_delete";
import { endpoints } from "./server_core/endpoint";

export const aluno_get_search = async (cpf) => {
    const endp = endpoints.ALUNO_GET + "/?cpf=" + cpf;
    return await ApiGet(endp)
}

export const aluno_post = async (
    name,
    course,
    cpf,
    college,
    entry_year,
    email,
    resumee,
    university_id,
    class_schedule,
    telephone,
    address,
    cep,
    city,
    number,
    state,
    complement,
    school
) => {
    const endp = endpoints.ALUNO_POST;
    const data = {
        name: name,
        course: course,
        cpf: cpf,
        college: college,
        entry_year: `${entry_year}-01-01`,
        email: email,
        resumee: resumee,
        university_id: university_id,
        class_schedule: class_schedule,
        telephone: telephone,
        address: address,
        cep: cep,
        city: city,
        number: number,
        state: state,
        complement: complement,
        school: school
    }
    return await ApiPost(endp, data)
}

export const aluno_put = async (
    name,
    course,
    cpf,
    college,
    entry_year,
    email,
    resumee,
    university_id,
    class_schedule,
    telephone,
    address,
    cep,
    city,
    number,
    state,
    complement,
    school
) => {
    const endp = endpoints.ALUNO_PUT;
    const data = {
        name: name,
        course: course,
        cpf: cpf,
        college: college,
        entry_year: `${entry_year}-01-01`,
        email: email,
        resumee: resumee,
        university_id: university_id,
        class_schedule: class_schedule,
        telephone: telephone,
        address: address,
        cep: cep,
        city: city,
        number: number,
        state: state,
        complement: complement,
        school: school
    }
    return await ApiPut(endp, data)
}

export const aluno_delete = async (cpf) => {
    const endp = endpoints.ALUNO_DELETE + "/?cpf=" + cpf;
    return await ApiDelete(endp)
}