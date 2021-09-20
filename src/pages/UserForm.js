import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function UserForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Tu nombre debe tener más de 1 caracter')
      .max(50, 'Tu nombre no puede tener más de 50 caractéres')
      .required('Se requiere que ingreses el primer nombre'),
    lastName: Yup.string()
      .min(2, 'Tu apellido debe tener más de 1 caracter')
      .max(50, 'Tu apellido no puede tener más de 50 caractéres')
      .required('Apellido requerido'),
    dni: Yup.string()
      .min(2, 'Tu DNI debe tener más de 1 dígito')
      .max(50, 'Tu DNI no puede tener más de 15 dígitos')
      .required('DNI requerido'),
    fechaDeNacimiento: Yup.date(),
    email: Yup.string().email('Debés ingresar un email correcto').required('Email requerido'),
    password: Yup.string().required('Password requerida')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      dni: '',
      fechaDeNacimiento: '',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Nombre"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Apellido"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="DNI"
              {...getFieldProps('dni')}
              error={Boolean(touched.dni && errors.dni)}
              helperText={touched.dni && errors.firstNdniame}
            />

            <TextField
              fullWidth
              type="date"
              label="Fecha de nacimiento"
              {...getFieldProps('lastName')}
              error={Boolean(touched.fechaDeNacimiento && errors.fechaDeNacimiento)}
              helperText={touched.fechaDeNacimiento && errors.fechaDeNacimiento}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Registrarme
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

export { UserForm };
