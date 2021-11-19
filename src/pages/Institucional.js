/* eslint-disable */
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography, Grid } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { LoginForm } from '../components/authentication/login';
import AuthSocial from '../components/authentication/AuthSocial';
import babylogin from '../assets/young-doctor.jpg';
import workImage from '../assets/work.jpg';
import familyImage from '../assets/family.JPG';
import pediatriaImage from '../assets/pediatria.JPG';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

const steps = [
    'Registráte',
    'Cargá los datos de tu hijo',
    'Llevá los registros a todas partes',
  ];

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <RootStyle title="Login | MedicApp">
      <AuthLayout>
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">
          ¡Logueate acá!
        </Link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        ¿No tenés una cuenta? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
          ¡Empezá acá!
        </Link>
      </AuthLayout>

      <Container maxWidth="md">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
          </Stack>

          <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={3} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                    </Stepper>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={familyImage}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        Sus primeros pasos
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Medicapp es una aplicación que te va a acompañar a vos y a 
                        tu hijo en sus primeros pasos &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={workImage}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        Registros de salud
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Con Medicapp podrá acceder a todos los registros de salud de su hijo
                        en cualquier momento y en cualquier lugar.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={pediatriaImage}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        Informáte
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        También podrá ver información general de salud como el calendario de 
                        vacunación o peso, altura medias.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
          </Grid>
        </ContentStyle>
        <footer>
            <Box bgcolor="#4AD737">
                <Container maxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={12}>
                            Copyright 2021 by UADE. All Rights Reserved.
                            Grupo 20 is Powered by Sarasa. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <TwitterIcon></TwitterIcon>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <FacebookIcon></FacebookIcon>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <InstagramIcon></InstagramIcon>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <WhatsAppIcon></WhatsAppIcon>

                            &nbsp;&nbsp;
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </footer>
      </Container>

    </RootStyle>

    
  );
}
