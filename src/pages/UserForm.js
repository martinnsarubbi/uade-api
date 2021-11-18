/* eslint-disable */

import * as Yup from 'yup';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import ChipInput from 'material-ui-chip-input';
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { crearHijo } from 'src/controller/UserController';

// ----------------------------------------------------------------------

export default function UserForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [enfermedades, setEnfermedades] = useState([]);
  const [alergias, setAlergias] = useState([]);

  const ChildSchema = Yup.object().shape({
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
    bloodtype: Yup.string()
      .min(2, 'El grupo sanguineo contiene al menos 2 caracteres')
      .max(50, 'Tu grupo sanguineo no puede tener mas de 50 caracteres'),
    chronicConditions: Yup.string()
    .min(2, 'El grupo sanguineo contiene al menos 2 caracteres')
    .max(50, 'Tu grupo sanguineo no puede tener mas de 50 caracteres'),
    allergies: Yup.string()
    .min(2, 'Las alergias contiene al menos 2 caracteres')
    .max(50, 'Tu grupo sanguineo no puede tener mas de 50 caracteres'),
  });

  const [bloodType, setBloodType] = React.useState('');

  const handleChange = (event) => {
    setBloodType(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      dni: '',
      fechaDeNacimiento: '',
      bloodType: ''
    },
    validationSchema: ChildSchema,
    onSubmit: (initialValues) => {
        registrarHijo(initialValues);
        // navigate('/dashboard', { replace: true });
    }
  });

  const registrarHijo = async function (initialValues) {
    crearHijo(initialValues.firstName, initialValues.lastName, initialValues.dni, initialValues.fechaDeNacimiento, bloodType, enfermedades, alergias)
    // let getLogin = await login(email, password);
    // if (getLogin.isLogin) {
    //     setUsuarioValido(true);
    // } else {
    //     alert(getLogin.message);
    // }
  };

  const handleAddEnfermedad = (enfermedad) => {
    setEnfermedades(enfermedades => [...enfermedades, enfermedad]);
  };

  const handleDeleteEnfermedad = (enfermedadBorrada, index) => {
    setAlergias(enfermedades.filter(enfermedad => enfermedad !== enfermedadBorrada))
  };

  const handleAddAlergia = (alergia) => {
    setAlergias(alergias => [...alergias, alergia]);
  };

  const handleDeleteAlergia = (alergiaBorrada, index) => {
    setAlergias(alergias.filter(alergia => alergia !== alergiaBorrada))
  };

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
              InputLabelProps={{ shrink: true }}
              fullWidth
              type="date"
              label="Fecha de nacimiento"
              {...getFieldProps('fechaDeNacimiento')}
              error={Boolean(touched.fechaDeNacimiento && errors.fechaDeNacimiento)}
              helperText={touched.fechaDeNacimiento && errors.fechaDeNacimiento}
            />
          </Stack>
          <FormControl fullWidth>
            <InputLabel id="tipo-sanguineo">Tipo sanguineo</InputLabel>
            <Select
              labelId="tipo-sanguíneo"
              id="tipo-sanguíneo"
              value={bloodType}
              label="Tipo sanguíneo"
              onChange={handleChange}
            >
              <MenuItem value={0}>A+</MenuItem>
              <MenuItem value={1}>A-</MenuItem>
              <MenuItem value={2}>B+</MenuItem>
              <MenuItem value={3}>B-</MenuItem>
              <MenuItem value={4}>O+</MenuItem>
              <MenuItem value={5}>O-</MenuItem>
              <MenuItem value={6}>AB+</MenuItem>
              <MenuItem value={7}>AB-</MenuItem>
            </Select>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <ChipInput
                fullWidth
                label="Enfermedades crónicas"
                value={enfermedades}
                onAdd={(enfermedad) => handleAddEnfermedad(enfermedad)}
                onDelete={(enfermedad, index) => handleDeleteEnfermedad(enfermedad, index)}
              />
              <ChipInput
                fullWidth
                label="Alergias"
                value={alergias}
                onAdd={(alergia) => handleAddAlergia(alergia)}
                onDelete={(alergia, index) => handleDeleteAlergia(alergia, index)}
              />
            </Stack>
          </FormControl>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Registrar hijo
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

export { UserForm };
