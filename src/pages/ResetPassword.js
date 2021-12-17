/* eslint-disable */
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import ResetPasswordForm from './ResetPasswordForm';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  }));
  
  const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
  }));
// ----------------------------------------------------------------------

export default function ResetPassword() {
  return (
    <RootStyle title="Reset | Minimal-UI">
      <AuthLayout>
        ¿Ya tenés una cuenta? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">
          Login
        </Link>
      </AuthLayout>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Reset
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Registrate acá.</Typography>
          </Box>

          <ResetPasswordForm />

          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            Al registrarme acepto los &nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Términos y Condiciones
            </Link>
            &nbsp;y&nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Políticas de Privacidad
            </Link>
            .
          </Typography>

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              ¿Ya tenés una cuenta?&nbsp;
              <Link to="/login" component={RouterLink}>
                Login
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>

    
  );
}
