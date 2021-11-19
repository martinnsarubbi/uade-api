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
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TableRow from '@mui/material/TableRow';
import { Stack, Container } from '@mui/material';
import { getHijos } from '../controller/UserController';
import calendarioVacunacion from '../assets/calendarioVacunacion.JPG'

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Vacunas Aplicadas
          </Typography>
        </Stack>
        <Button onClick={handleOpen}>Ver calendario de vacunación</Button>
        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
            <img src={calendarioVacunacion} alt="calendarioVacunacion" />
          </Box>
        </Modal>
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
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography>
                                  <b>Nombre de Vacuna</b>
                                </Typography>
                              </Stack>
                              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography>
                                  {vaccine.vaccineName}
                                </Typography>
                              </Stack>
                              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography>
                                  <b>Observaciones</b>
                                </Typography>
                              </Stack>
                              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography>
                                  {vaccine.observations}
                                </Typography>
                              </Stack>
                              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography>
                                  <b>Lugar de Aplicacion</b>
                                </Typography>
                              </Stack>
                              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography>
                                  {vaccine.location}
                                </Typography>
                              </Stack>
                              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography>
                                  <b>Fecha de Aplicacion</b>
                                </Typography>
                              </Stack>
                              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography>{new Date(vaccine.vaccinationDate).toLocaleDateString('es-AR')}</Typography>
                              </Stack>
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
