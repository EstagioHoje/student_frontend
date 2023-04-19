import * as React from 'react';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import logo from "../../data/logo.png";
import InputMask from "react-input-mask";
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid';

import teacherButtons from '../../data/teacherButtons.json'
import { Sidebar } from '../../components/sidebar/sidebar';

import { vaga_put } from '../../actions/Vaga';
import { vaga_get_search } from '../../actions/Vaga';
import { vaga_delete } from '../../actions/Vaga';
import { vaga_apply } from '../../actions/Vaga';

export default function VagaReadComplete({ setAuthorized }) {
  const navigate = useNavigate()
  const [cpf, setCPF] = useState(sessionStorage.getItem("cpf"));
  const params = new URLSearchParams(window.location.search);

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerHeight);

  const [role, setRole] = useState('');
  const [weekly_hours, setWeekly_hours] = useState('');
  const [physicality, setPhysicality] = useState('');
  const [vacancies, setVacancies] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [company_name, setCompany_name] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [id, setId] = useState('')

  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight)
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize);
    return _ => {
      window.removeEventListener('resize', handleResize);
    }
  })

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.search);
      setId(params.get("id"))
      let info = await vaga_get_search(params.get("id"))
      // console.log(info)
      if (info != null) {
        if (info.data[0] != null) {
          setRole(info.data[0].role)
          setWeekly_hours(info.data[0].weekly_hours)
          setPhysicality(info.data[0].physicality)
          setVacancies(info.data[0].vacancies)
          setSalary(info.data[0].salary)
          setDescription(info.data[0].description)
          setRequirements(info.data[0].requirements)
          setAddress(info.data[0].address)
          setCompany_name(info.data[0].company_name)
        }
      }
    }
    )()
  }, '');

  const candidate_vaga = async () => {
    vaga_apply(cpf, id)
    navigate("/vagas")
  }

  return (
    <Container disableGutters maxWidth={windowWidth} sx={{ padding: 0 }}>
      <Box sx={{ minWidth: 600, minHeight: 300, height: windowHeight, padding: 0, mb: 0 }}>
        <Grid container spacing={0}>
          <Grid sx={{ maxWidth: 240, minWidth: 240 }}>
            <Sidebar
              setAuthorized={setAuthorized}>
            </Sidebar>
          </Grid>
          <Grid xs sx={{
            display: "flex",
            flexDirection: "column",
            height: windowHeight,
            minHeight: 400,
            minWidth: 360,
            overflow: "hidden",
            overflowY: "scroll",
          }}>
            <Box sx={{ mx: 2 }}>
              <Box sx={{ my: 2 }}>
                <h2>Informações da Vaga</h2>
              </Box>
              <Box sx={{ my: 2 }}>
                <Grid container spacing={0} columns="16">
                  <Grid xs={10}>
                    <Box sx={{ mr: 1 }}>
                      <TextField
                        id="role"
                        value={role}
                        fullWidth
                        label="Nome da vaga"
                        size="small"
                        inputProps={{ readOnly: true }}
                      />
                    </Box>
                  </Grid>
                  <Grid xs>
                    <Box sx={{ ml: 1 }}>
                      <InputMask
                        mask="99"
                        disabled={false}
                        maskChar=" "
                        value={weekly_hours}
                        inputProps={{ readOnly: true }}
                      >
                        {() => <TextField
                          id="weekly_hours"
                          label="Horas semanais"
                          fullWidth
                          size="small"
                        />}
                      </InputMask>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ my: 2 }}>
                <Grid container spacing={0} columns="12">
                  <Grid xs={4}>
                    <Box sx={{ mr: 1 }}>
                      <TextField
                        id="physicality"
                        value={physicality}
                        fullWidth
                        label="Fisicalidade"
                        size="small"
                        inputProps={{ readOnly: true }}
                      >
                      </TextField>
                    </Box>
                  </Grid>
                  <Grid xs>
                    <Box sx={{ mx: 1 }}>
                      <InputMask
                        mask="99999"
                        value={salary}
                        disabled={false}
                        maskChar=" "
                        inputProps={{ readOnly: true }}
                      >
                        {() => <TextField
                          id="salary"
                          fullWidth
                          label="Salário"
                          size="small"
                        />}
                      </InputMask>
                    </Box>
                  </Grid>
                  <Grid xs>
                    <Box sx={{ ml: 1 }}>
                      <InputMask
                        mask="99"
                        value={vacancies}
                        disabled={false}
                        maskChar=" "
                        inputProps={{ readOnly: true }}
                      >
                        {() => <TextField
                          id="vacancies"
                          fullWidth
                          label="Número de vagas"
                          size="small"
                        />}
                      </InputMask>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ my: 2 }}>
                <Grid container spacing={0} columns="16">
                  <Grid xs={16}>
                    <Box sx={{}}>
                      <TextField
                        id="description"
                        value={description}
                        fullWidth
                        label="Descrição da função e serviços"
                        size="small"
                        inputProps={{ readOnly: true }}
                        multiline
                        maxRows={4}
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
                        id="requirements"
                        value={requirements}
                        fullWidth
                        label="Requisitos e habilidades esperadas do estágiario"
                        size="small"
                        inputProps={{ readOnly: true }}
                        multiline
                        maxRows={4}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ my: 2 }}>
                <h2>Informações da Empresa</h2>
              </Box>
              <Box sx={{ my: 2 }}>
                <Grid container spacing={0} columns="16">
                  <Grid xs={10}>
                    <Box sx={{ mr: 1 }}>
                      <TextField
                        id="company_name"
                        value={company_name}
                        fullWidth
                        label="Nome da empresa"
                        size="small"
                        inputProps={{ readOnly: true }}
                      />
                    </Box>
                  </Grid>
                  <Grid xs>
                    <Box sx={{ ml: 1 }}>
                      <TextField
                        id="address"
                        value={address}
                        fullWidth
                        label="Endereço"
                        size="small"
                        inputProps={{ readOnly: true }}
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
                        backgroundColor: '#cb1d1d',
                        color: '#feea37'
                      }}
                        onClick={() => candidate_vaga()}>
                        Candidatar à vaga
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container >
  );
}