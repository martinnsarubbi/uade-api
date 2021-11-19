/* eslint-disable */

import * as React from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableRow from '@mui/material/TableRow';
import { Stack, Container } from '@mui/material';
import { getHijos } from '../controller/UserController';

const columns = [
  { id: 'nombreVacuna', label: 'Vacuna', minWidth: 170 },
  { id: 'fechaAplicacion', label: 'Fecha de aplicación', minWidth: 100 },
  { id: 'institucion', label: 'Institución', minWidth: 100 },
  { id: 'marca', label: 'Marca', minWidth: 100 }
];

function createData(nombreVacuna, fechaAplicacion, institucion, marca) {
  return { nombreVacuna, fechaAplicacion, institucion, marca };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

const rows = [
  createData('BCG', '01/01/2020', 'Hospital Garrahan', 'X'),
  createData('Hepatitis B', '01/01/2020', 'Hospital Garrahan', 'Y'),
  createData('Neumococo Conjugada 13 Valente', '01/01/2020', 'Hospital Garrahan', 'Z'),
  createData('Quíntuple o pentavalente', '-', '-', '-'),
  createData('IPV', '-', '-', '-'),
  createData('Rotavirus', '-', '-', '-')
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [age, setAge] = React.useState('');
  const [value, setValue] = React.useState(0);
  const [hijos, setHijos] = React.useState([]);

  React.useEffect(() => {
      getHijos().then(data => {
          setHijos([...data.hijos])})
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Vacunas Aplicadas
          </Typography>
        </Stack>
      <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                {hijos.map((hijo, index) =>
                    <Tab label={hijo.name + " " + hijo.lastName} {...a11yProps(index)} />)}
            </Tabs>
          </Box>
          {hijos.map((hijo, index) => {
              return <>
                    <TabPanel value={value} index={index}>
                        {hijo.vaccinations.map((vaccine, index) => {
                            return <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              sx={{
                                bgcolor: '#90EE90'
                              }}
                            >
                              <Typography>{vaccine.vaccineName}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Grid container>
                                  <Grid item xs>
                                    <b>Peso:</b> {registry.weight}
                                  </Grid>
                                  <Divider orientation="vertical" flexItem />
                                  <Grid item xs>
                                    <b>Altura:</b> {registry.height}
                                  </Grid>
                                  <Divider orientation="vertical" flexItem />
                                  <Grid item xs>
                                    <b>Diámetro cabeza:</b> {registry.headCirc}
                                  </Grid>
                                </Grid>
                              </Stack>
                              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography>
                                  <b>Observaciones</b>
                                </Typography>
                              </Stack>
                              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography>
                                  Salud en perfecto estado. Se debe realizar otra revisión en 1 mes y medio.
                                </Typography>
                              </Stack>
                              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography>
                                  <b>Medicamentos recetados:</b>
                                </Typography>
                              </Stack>
                              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography>
                                  Ibupirac - 1 dosis por dia - (desde el 10/01/2020 hasta el 13/01/2020)
                                </Typography>
                              </Stack>
                              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography>
                                  <b>Estudios a realizar</b>
                                </Typography>
                              </Stack>
                              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography>Estudios de sangre - Estudios de orina</Typography>
                              </Stack>
                              <Button>Cargar estudios</Button> */}
                            </AccordionDetails>
                          </Accordion>
                        })}
                    </TabPanel>
              </>
          })}
        </Box>
        </Container>
    </Paper>
  );
}
