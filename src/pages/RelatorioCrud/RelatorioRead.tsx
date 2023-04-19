import * as React from 'react';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { Collapse } from '@mui/material';

import { Sidebar } from '../../components/sidebar/sidebar';
import { empresa_get_search, relatorio_get_all_cpf } from '../../actions/Relatorio';


export default function RelatorioRead({ setAuthorized }) {
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cnpj, setCnpj] = useState(sessionStorage.getItem("cnpj"))
  const [rows, setRows] = useState([])
  const [cpf, setCPF] = useState(sessionStorage.getItem("cpf"));


  const columns: GridColDef[] = [{
    field: 'id',
    headerName: '',
    width: 300,
    renderCell: (params) => (
      <Link component={RouterLink} to={`/relatorio/create?id=${params.value}`}>
        Acessar
      </Link>),
  }, {
    field: 'company_name',
    headerName: 'Empresa',
    width: 300
  }, {
    field: 'start_date',
    headerName: 'Inicio do estágio',
    width: 180
  }, {
    field: 'end_date',
    headerName: 'Fim do estágio',
    width: 180
  }];
  useEffect(() => {

    (async () => {
      let info = await relatorio_get_all_cpf(cpf);
      console.log(info);
      console.log(info.data);
      if (info != null) {
        if (info.data != null) {
          if (info.data[0] != null) {
            const teste = info.data.reduce(async function (result, element) {
              let cnpj = element.company_cnpj;
              const arrayRelatorio = {};
              arrayRelatorio.id = element.id;
              arrayRelatorio.company_name = await empresa_get_search(cnpj).data[0].name
              arrayRelatorio.start_date = element.contract_data;
              arrayRelatorio.end_date = element.contract_data;
              result.push(arrayRelatorio)
              return result;
            }, []);
            console.log(teste)
            setRows(teste);
          }
        }
      }
    }
    )()
  }, []);

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
            <Box sx={{ width: '100%', height: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 20,
                    },
                  },
                }}
                slots={{
                  toolbar: GridToolbar,
                }}
                disableRowSelectionOnClick
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}




/*export default function VagaRead() {
    const [rows,setRows] = useState([])

    useEffect(() => {

        (async () => {
            let info = await empresa_get_all();
            console.log(info);
            console.log(info.data);
            if (info != null) {
                if (info.data != null) {
                    if (info.data[0] != null) {
                        const teste = info.data.map(item => {
                            const teste2 = {};
                            teste2.id = item.cnpj;
                            return teste2;
                        });
                        setRows(teste);
                    }
                }

            }

        }
        )()

    }, []);


    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 20,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
        </Box>
    );
}*/
