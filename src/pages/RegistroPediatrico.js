/* eslint-disable */

import * as React from 'react';
import PropTypes from 'prop-types';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Icon } from '@iconify/react';
import Modal from '@mui/material/Modal';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography
} from '@mui/material';
import Page from '../components/Page';
import { RegistroPediatricoForm } from './RegistroPediatricoForm';
import boyPhoto from '../assets/alvaro.jpg';
import girlPhoto from '../assets/olivia.jpg';

import { getHijos } from '../controller/UserController';

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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const [hijos, setHijos] = React.useState([]);

  React.useEffect(() => {
      getHijos().then(data => {
        data.hijos.forEach(hijo => hijo.pediatricRegistries = hijo.pediatricRegistries.sort( (a, b) => a.date >= b.date));
          setHijos([...data.hijos])})
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };

  const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& [role="separator"]': {
      margin: theme.spacing(0, 2)
    }
  }));

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Page title="Inicio | MedicApp">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Registros pediátricos
          </Typography>
          <Button
            onClick={handleOpen}
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            Registro pediátrico
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Nuevo registro pediátrico
              </Typography>
              <RegistroPediatricoForm handleClose={handleClose} hijos={hijos} setHijos={setHijos} />
            </Box>
          </Modal>
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
                        {hijo.pediatricRegistries.map((registry, index) => {
                            return <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              sx={{
                                bgcolor: '#90EE90'
                              }}
                            >
                              <Typography>{new Date(registry.date).toLocaleDateString('es-AR')}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
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
                                  {registry.observations}
                                </Typography>
                              </Stack>
                              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography>
                                  <b>Medicamentos recetados:</b>
                                </Typography>
                              </Stack>
                              {registry.meds.map((med, index) => {
                                  return <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                      <Typography>
                                          {med.medsName}, Dosaje: {med.dosage}. Desde: {new Date(med.from).toLocaleDateString('es-AR')} - Hasta: {new Date(med.to).toLocaleDateString('es-AR')}
                                      </Typography>
                                  </Stack>
                              })}
                              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography>
                                  <b>Estudios a realizar</b>
                                </Typography>
                              </Stack>
                              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography>{registry.upcomingStudies}</Typography>
                              </Stack>
                              <Button>Cargar estudios</Button>
                            </AccordionDetails>
                          </Accordion>
                        })}
                    </TabPanel>
              </>
          })}
        </Box>
      </Container>
    </Page>
  );
}
