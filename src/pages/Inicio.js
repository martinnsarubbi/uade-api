/* eslint-disable */
// material
import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Container, Typography, Avatar, Stack} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Popover from '@mui/material/Popover';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppAltura,
  AppPeso,
  AppDiametro,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';
import boyPhoto from '../assets/alvaro.jpg';
import girlPhoto from '../assets/olivia.jpg';
import ninoPeso from '../assets/ninoPeso.JPG';
import ninaPeso from '../assets/ninaPeso.JPG';
import ninoAltura from '../assets/ninoAltura.JPG';
import ninaAltura from '../assets/ninaAltura.JPG';
import ninoCircu from '../assets/ninoCircu.JPG';
import ninaCircu from '../assets/ninaCircu.JPG';

import { getHijos } from '../controller/UserController';

// ----------------------------------------------------------------------

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

export default function DashboardApp() {
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

  const [value, setValue] = React.useState(0);

  const [hijos, setHijos] = React.useState([]);

  React.useEffect(() => {
      getHijos().then(data => {
          data.hijos.forEach(hijo => hijo.pediatricRegistries = hijo.pediatricRegistries.sort( (a, b) => a.date <= b.date));
          setHijos([...data.hijos])})
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Page title="Dashboard | MedicApp">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Percentiles</Typography>
        </Box>
        <Box sx={{ pb: 5 }}>
        {hijos.map((hijo, index) => {
              return <>
              hijo: {hijo.name}
              </>
          })}
        </Box>
        <Grid container spacing={3}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Altura" {...a11yProps(0)} />
                <Tab label="Peso" {...a11yProps(1)} />
                <Tab label="Diámetro encefálico" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Grid container spacing={3}>
              <Typography
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  >
                    ¿Qué es un percentil?
                  </Typography>
                  <Popover
                    id="mouse-over-popover"
                    sx={{
                      pointerEvents: 'none'
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left'
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    <Typography sx={{ p: 1 }}>
                      Los percentiles sólo indican en qué lugar se encuentra el niño con respecto a
                      <br />
                      otros niños de su mismo sexo y edad. Cuanto más cerca está el percentil a 50,
                      <br />
                      más cerca de la media estará.
                    </Typography>
                  </Popover>
                <Grid item xs={12}>
                  <img src={ninoAltura} alt="ninoAltura" />
                  <img src={ninaAltura} alt="ninaAltura" />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
            <Grid container spacing={3}>
            <Typography
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  >
                    ¿Qué es un percentil?
                  </Typography>
                  <Popover
                    id="mouse-over-popover"
                    sx={{
                      pointerEvents: 'none'
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left'
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    <Typography sx={{ p: 1 }}>
                      Los percentiles sólo indican en qué lugar se encuentra el niño con respecto a
                      <br />
                      otros niños de su mismo sexo y edad. Cuanto más cerca está el percentil a 50,
                      <br />
                      más cerca de la media estará.
                    </Typography>
                  </Popover>
                <Grid item xs={12}>
                  <img src={ninoPeso} alt="ninoPeso" />
                  <img src={ninaPeso} alt="ninaPeso" />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
            <Grid container spacing={3}>
            <Typography
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  >
                    ¿Qué es un percentil?
                  </Typography>
                  <Popover
                    id="mouse-over-popover"
                    sx={{
                      pointerEvents: 'none'
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left'
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    <Typography sx={{ p: 1 }}>
                      Los percentiles sólo indican en qué lugar se encuentra el niño con respecto a
                      <br />
                      otros niños de su mismo sexo y edad. Cuanto más cerca está el percentil a 50,
                      <br />
                      más cerca de la media estará.
                    </Typography>
                  </Popover>
                <Grid item xs={12}>
                  <img src={ninoCircu} alt="ninoCircu" />
                  <img src={ninaCircu} alt="ninaCircu" />
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
        </Grid>
      </Container>
    </Page>
  );
}
