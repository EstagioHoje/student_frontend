import * as React from 'react';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import logo from "../../data/logo.png";
import { useNavigate } from 'react-router-dom';
import InputMask from "react-input-mask";
import { useSearchParams, Route, Link } from 'react-router-dom'

import { api_links } from '../../actions/server_core/endpoint';
import { aluno_put } from '../../actions/Aluno';
import { aluno_get_search } from '../../actions/Aluno';
import { aluno_delete } from '../../actions/Aluno';

import { Sidebar } from '../../components/sidebar/sidebar';

export default function AlunoReadUpdateDelete({ setAuthorized }) {
    const navigate = useNavigate()
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [student_email, Set_student_email] = useState([]);
    const [student_name, Set_student_name] = useState([]);
    const [student_cpf, Set_student_cpf] = useState(localStorage.getItem("cpf"));
    const [student_college, Set_student_college] = useState([]);
    const [student_course, Set_student_course] = useState([]);
    const [student_school, Set_student_school] = useState([]);
    const [student_entry_year, Set_student_entry_year] = useState([]);
    const [student_telephone, Set_student_telephone] = useState([]);
    const [student_address, Set_student_address] = useState([]);
    const [student_cep, Set_student_cep] = useState([]);
    const [student_city, Set_student_city] = useState([]);
    const [student_number, Set_student_number] = useState([]);
    const [student_state, Set_student_state] = useState([]);
    const [student_complement, Set_student_complement] = useState("");
    const [resumee, Set_resumee] = useState("");
    const [student_university_id, Set_student_university_id] = useState([]);

    useEffect(() => {
        function handleResize() {
            setWindowHeight(window.innerHeight)
            setWindowWidth(window.innerWidth)
            console.log(window.location.href)
        }

        window.addEventListener('resize', handleResize);

        return _ => {
            window.removeEventListener('resize', handleResize);
        }
    })

    const [info, setInfo] = useState([])

    useEffect(() => {

        (async () => {
            var cpfString = String(student_cpf)
            const cpfStringMod = (cpfString.replace(/\D/g, ""))
            let info = await aluno_get_search(parseInt(cpfStringMod))
            console.log(info)
            if (info != null) {
                if (info.data.data != null) {
                    Set_student_email(info.data.data[0].email)
                    Set_student_college(info.data.data[0].college)
                    Set_student_name(info.data.data[0].name)
                    Set_student_course(info.data.data[0].course)
                    Set_student_school(info.data.data[0].school)
                    
                    Set_student_entry_year(String(parseInt(info.data.data[0].entry_year)))
                    Set_student_telephone(info.data.data[0].telephone)
                    Set_student_address(info.data.data[0].address)
                    Set_student_cep(info.data.data[0].cep)
                    Set_student_city(info.data.data[0].city)
                    Set_student_number(info.data.data[0].number)
                    Set_student_state(info.data.data[0].state)
                    Set_student_complement(info.data.data[0].complement)
                    Set_resumee(info.data.data[0].resumee)
                    Set_student_university_id(info.data.data[0].university_id)
                    Set_resumee(info.data.data[0].resumee)
                }
            }

        }
        )()

    }, []);

    const update_aluno = async () => {
        var cpfString = String(student_cpf)
        const cpfStringMod = (cpfString.replace(/\D/g, ""))
        console.log(aluno_put(student_name, cpfStringMod, student_course, student_college, student_entry_year,
            student_email, resumee, student_university_id, student_school, student_telephone, student_address,
            student_cep, student_city, student_address, student_state, student_complement))
    }

    const delete_aluno = async () => {

        var cpfString = String(student_cpf);
        const cpfStringMod = (cpfString.replace(/\D/g, ""));
        aluno_delete(cpfStringMod)
        navigate("/login")
    }


    return (
        <Container disableGutters maxWidth={windowWidth} sx={{ padding: 0 }}>
            <Box sx={{ minWidth: 600, minHeight: 300, height: windowHeight, padding: 0, mb: 0 }}>
                <Grid container spacing={0}>
                    <Grid xs sx={{ maxWidth: 240, minWidth: 240 }}>
                        <Sidebar
                            setAuthorized={setAuthorized}>
                        </Sidebar>
                    </Grid>
                    <Grid xs sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: windowHeight,
                        minHeight: 400,
                        overflow: "hidden",
                        overflowY: "scroll",
                    }}>
                        <Box sx={{
                            mx: 2
                        }}>
                            <Box sx={{ my: 2 }}>
                                Informações do Aluno
                            </Box>
                            <Box sx={{ my: 2 }}>
                                <Grid container spacing={0} columns="16">
                                    <Grid xs={7}>
                                        <Box sx={{ mr: 1 }}>

                                            <TextField
                                                id="student_name"
                                                value={student_name}
                                                fullWidth
                                                label="Nome do estágiario"
                                                defaultValue=""
                                                size="small"
                                                onChange={(e) => Set_student_name(e.target.value)}
                                            />
                                        </Box>
                                    </Grid>

                                    <Grid xs>
                                        <Box sx={{ mx: 1 }}>
                                            <InputMask
                                                mask="9999"
                                                value={student_entry_year}
                                                disabled={false}
                                                maskChar=" "
                                                onChange={(e) => Set_student_entry_year(e.target.value)}
                                            >
                                                {() => <TextField
                                                    id="student_entry_year"
                                                    label="Ano de ingresso"
                                                    defaultValue=""
                                                    fullWidth
                                                    size="small"
                                                />}
                                            </InputMask>
                                        </Box>

                                    </Grid>
                                    <Grid xs={4}>
                                        <Box sx={{ ml: 1 }}>
                                            <InputMask
                                                mask="999.999.999-99"
                                                value={student_cpf}
                                                disabled={false}
                                                maskChar=" "
                                            >
                                                {() => <TextField
                                                    id="student_cpf"
                                                    fullWidth
                                                    label="CPF"
                                                    defaultValue=""
                                                    size="small"
                                                    inputProps={{ readOnly: true, disableUnderline: true }}
                                                />}
                                            </InputMask>
                                        </Box>
                                    </Grid>
                                </Grid>

                            </Box>

                            <Box sx={{ my: 2 }}>
                                <Grid container spacing={0} columns="16">
                                    <Grid xs={6}>
                                        <Box sx={{ mr: 1 }}>
                                            <TextField
                                                id="student_college"
                                                value={student_college}
                                                fullWidth
                                                label="Universidade estágiario"
                                                defaultValue=""
                                                size="small"
                                                onChange={(e) => Set_student_college(e.target.value)}
                                            />

                                        </Box>
                                    </Grid>
                                    <Grid xs={6}>
                                        <Box sx={{ mx: 1 }}>
                                            <TextField
                                                id="student_course"
                                                value={student_course}
                                                fullWidth
                                                label="Curso do estágiario"
                                                defaultValue=""
                                                size="small"
                                                onChange={(e) => Set_student_course(e.target.value)}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid xs>
                                        <Box sx={{ ml: 1 }}>
                                            <TextField
                                                id="student_university_id"
                                                value={student_university_id}
                                                fullWidth
                                                label="ID da universidade"
                                                defaultValue=""
                                                size="small"
                                                onChange={(e) => Set_student_university_id(e.target.value)}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ my: 2 }}>
                                <Grid container spacing={0} columns="16">
                                    <Grid xs={6}>
                                        <Box sx={{ mr: 1 }}>
                                            <InputMask
                                                mask="(99)999999999"
                                                value={student_telephone}
                                                disabled={false}
                                                maskChar=" "
                                                onChange={(e) => Set_student_telephone(e.target.value)}
                                            >
                                                {() => <TextField
                                                    id="student_telephone"
                                                    fullWidth
                                                    label="Telefone do estágiario"
                                                    defaultValue=""
                                                    size="small"

                                                />}
                                            </InputMask>
                                        </Box>
                                    </Grid>
                                    <Grid xs>
                                        <Box sx={{ ml: 1 }}>
                                            <TextField
                                                id="student_school"
                                                value={student_school}
                                                label="Faculdade"
                                                defaultValue=""
                                                fullWidth
                                                size="small"
                                                onChange={(e) => Set_student_school(e.target.value)}
                                            />
                                        </Box>

                                    </Grid>
                                    <Grid xs>
                                        <Box sx={{ ml: 1 }}>
                                            <TextField
                                                id="student_email"
                                                value={student_email}
                                                label="Email"
                                                defaultValue=""
                                                fullWidth
                                                size="small"
                                                onChange={(e) => Set_student_email(e.target.value)}
                                            />
                                        </Box>

                                    </Grid>
                                </Grid>
                            </Box>


                            <Box sx={{ my: 2 }}>
                                <Grid container spacing={0} columns="16">
                                    <Grid xs={5}>
                                        <Box sx={{ mr: 1 }}>
                                            <InputMask
                                                mask="99999-999"
                                                value={student_cep}
                                                disabled={false}
                                                maskChar=" "
                                                onChange={(e) => Set_student_cep(e.target.value)}
                                            >
                                                {() => <TextField
                                                    id="student_cep"
                                                    fullWidth
                                                    label="CEP do Estágiario"
                                                    defaultValue=""
                                                    size="small"

                                                />}
                                            </InputMask>
                                        </Box>
                                    </Grid>
                                    <Grid xs>
                                        <Box sx={{ ml: 1 }}>
                                            <TextField
                                                id="address"
                                                value={student_address}
                                                label="Endereço"
                                                defaultValue=""
                                                fullWidth
                                                size="small"
                                                onChange={(e) => Set_student_address(e.target.value)}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box sx={{ my: 2 }}>
                                <Grid container spacing={0} columns="16">
                                    <Grid xs={4}>
                                        <Box sx={{ mr: 1 }}>
                                            <TextField
                                                id="student_number"
                                                value={student_number}
                                                fullWidth
                                                label="Número"
                                                defaultValue=""
                                                size="small"
                                                onChange={(e) => Set_student_number(e.target.value)}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid xs>
                                        <Box sx={{ mx: 1 }}>
                                            <TextField
                                                id="student_city"
                                                value={student_city}
                                                label="Cidade"
                                                defaultValue=""
                                                fullWidth
                                                size="small"
                                                onChange={(e) => Set_student_city(e.target.value)}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid xs>
                                        <Box sx={{ ml: 1 }}>
                                            <TextField
                                                id="student_state"
                                                value={student_state}
                                                label="Estado"
                                                defaultValue=""
                                                fullWidth
                                                size="small"
                                                onChange={(e) => Set_student_state(e.target.value)}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box sx={{ my: 2 }}>
                                <Grid container spacing={0} columns="16">
                                    <Grid xs>
                                        <Box sx={{ m: 0 }}>
                                            <TextField
                                                id="student_complement"
                                                value={student_complement}
                                                label="Complemento"
                                                defaultValue=""
                                                fullWidth
                                                size="small"
                                                onChange={(e) => Set_student_complement(e.target.value)}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ my: 2 }}>
                                <Grid container spacing={0} columns="16">
                                    <Grid xs={16}>
                                        <Box sx={{}}>
                                            <TextField
                                                id="resumee"
                                                value={resumee}
                                                fullWidth
                                                label="Coloque o seu curriculo(Máximo 1000 caracteres)"
                                                onChange={(e) => Set_resumee(e.target.value)}
                                                multiline
                                                maxRows={4}
                                                inputProps={{ maxLength: 1000 }}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box sx={{ my: 2 }}>
                                <Grid container spacing={0} columns="16">
                                    <Grid xs>
                                        <Box sx={{ my: 2, mr: 1 }}>
                                            <Button fullWidth sx={{
                                                backgroundColor: "yellow"

                                            }}
                                                onClick={() => update_aluno()}>
                                                Salvar informações
                                            </Button>
                                        </Box>
                                    </Grid>
                                    <Grid xs>
                                        <Box sx={{ my: 2, ml: 1 }}>
                                            <Button fullWidth sx={{
                                                backgroundColor: "red"

                                            }}
                                                onClick={() => delete_aluno()}>
                                                Excluir conta
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}