/* eslint-disable */

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
import { register } from '../controller/UserController';
import { cambiarPassword } from '../controller/UserController';

// ----------------------------------------------------------------------

export default function ResetPasswordForm() {
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    token: Yup.string()
      .required('Introduzca el token recibido en su casilla de correo'),
    password: Yup.string()
      .required('Password requerida')
  });

  const formik = useFormik({
    initialValues: {
      token: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (initialValues) => {
        cambiarPass(initialValues);
        //validarRegistro(initialValues);
      // navigate('/dashboard', { replace: true });
    }
  });

  const cambiarPass = async function (values) {

    let changePassword = await cambiarPassword(localStorage.getItem("recoverEmail"), values.token, values.password);
    if (changePassword.isSuccess) {
        navigate('/login', { replace: true });
    } else {
        alert(changePassword.message);
    }
  };

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Token"
              {...getFieldProps('token')}
              error={Boolean(touched.token && errors.token)}
              helperText={touched.token && errors.token}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="password"
            type="password"
            label="Password"
            {...getFieldProps('password')}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Cambiar Contraseña
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
