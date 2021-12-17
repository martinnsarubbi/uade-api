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
import { enviarEmail } from 'src/controller/UserController';

// ----------------------------------------------------------------------

export default function RecuperarForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email('Debés ingresar un email correcto')
      .required('Email requerido')
  });

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (initialValues) => {
        enviarMail(initialValues.email);
      // navigate('/reset', { replace: true });
    }
  });

  const enviarMail = async function (email) {
    let sendMail = await enviarEmail(email);
    if (sendMail.isSuccess) {
        localStorage.setItem("recoverEmail", email)
        navigate('/reset', { replace: true });
    } else {
        alert(sendMail.message);
    }
  };

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Recuperar Contraseña
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
