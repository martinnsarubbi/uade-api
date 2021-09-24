// material
import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Container, Typography, Avatar } from '@mui/material';
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
          <Typography variant="h4">Indicadores</Typography>
        </Box>
        <Grid container spacing={3}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Altura (cm)" {...a11yProps(0)} />
                <Tab label="Peso (kg)" {...a11yProps(1)} />
                <Tab label="Diámetro encefálico (cm)" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={8}>
                  <AppAltura />
                </Grid>
                <Grid item xs={4}>
                  <Grid container>
                    <Grid xs={4}>
                      <Avatar alt="Olivia" src={girlPhoto} sx={{ width: 60, height: 60 }} />
                      <Typography variant="h5">Olivia Diaz</Typography>
                    </Grid>
                    <Grid xs={8}>
                      <p>
                        <b>Altura:</b> 73 cm
                      </p>
                      <p>Percentil P45</p>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid xs={4}>
                      <Avatar alt="Olivia" src={boyPhoto} sx={{ width: 60, height: 60 }} />
                      <Typography variant="h5">Álvaro Diaz</Typography>
                    </Grid>
                    <Grid xs={8}>
                      <p>
                        <b>Altura:</b> 55 cm
                      </p>
                      <p>Percentil P65</p>
                    </Grid>
                  </Grid>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
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
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid container spacing={3}>
                <Grid item xs={8}>
                  <AppPeso />
                </Grid>
                <Grid item xs={4}>
                  <Grid container>
                    <Grid xs={4}>
                      <Avatar alt="Olivia" src={girlPhoto} sx={{ width: 60, height: 60 }} />
                      <Typography variant="h5">Olivia Diaz</Typography>
                    </Grid>
                    <Grid xs={8}>
                      <p>
                        <b>Peso:</b> 11 kg
                      </p>
                      <p>Percentil P57</p>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid xs={4}>
                      <Avatar alt="Olivia" src={boyPhoto} sx={{ width: 60, height: 60 }} />
                      <Typography variant="h5">Álvaro Diaz</Typography>
                    </Grid>
                    <Grid xs={8}>
                      <p>
                        <b>Peso:</b> 12 kg
                      </p>
                      <p>Percentil P41</p>
                    </Grid>
                  </Grid>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
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
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Grid container spacing={3}>
                <Grid item xs={8}>
                  <AppDiametro />
                </Grid>
                <Grid item xs={4}>
                  <Grid container>
                    <Grid xs={4}>
                      <Avatar alt="Olivia" src={boyPhoto} sx={{ width: 60, height: 60 }} />
                      <Typography variant="h5">Álvaro Diaz</Typography>
                    </Grid>
                    <Grid xs={8}>
                      <p>
                        <b>Diámetro encefálico:</b> 40 cm
                      </p>
                      <p>Percentil P50</p>
                    </Grid>
                  </Grid>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
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
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
        </Grid>
      </Container>
    </Page>
  );
}
