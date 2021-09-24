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
              <RegistroPediatricoForm />
            </Box>
          </Modal>
        </Stack>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Olivia Diaz" {...a11yProps(0)} />
              <Tab label="Álvaro Diaz" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={8}>
              <Avatar alt="Olivia" src={girlPhoto} sx={{ width: 120, height: 120 }} />
              <Typography variant="h3" component="h3">
                Fecha de nacimiento: 20/01/2020 (19 meses)
              </Typography>
            </Stack>
            <div>&nbsp;</div>
            <div>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{
                    bgcolor: '#90EE90'
                  }}
                >
                  <Typography>Control 10/01/2021</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Grid container>
                      <Grid item xs>
                        <b>Peso:</b> 123
                      </Grid>
                      <Divider orientation="vertical" flexItem />
                      <Grid item xs>
                        <b>Alura:</b> 123
                      </Grid>
                      <Divider orientation="vertical" flexItem />
                      <Grid item xs>
                        <b>Diámetro cabeza:</b> 123
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
                  <Button>Cargar estudios</Button>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{
                    bgcolor: '#90EE90'
                  }}
                >
                  <Typography>Control 20/01/2020</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                    lacus ex, sit amet blandit leo lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            No hay datos cargados.
          </TabPanel>
        </Box>
      </Container>
    </Page>
  );
}