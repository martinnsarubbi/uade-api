/* eslint-disable */
import * as Yup from 'yup';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Icon } from '@iconify/react';
import { Formik, useFormik, Form, FormikProvider, Field, FieldArray } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import ChipInput from 'material-ui-chip-input';
import { Divider, Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import { LoadingButton } from '@mui/lab';
import { agregarRegistroPedriatrico } from 'src/controller/UserController';

// ----------------------------------------------------------------------

export default function RegistroPediatricoForm(props) {
  const navigate = useNavigate();
  const [showobservaciones, setShowobservaciones] = useState(false);
  const [estudios, setEstudios] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [hijo, setHijo] = React.useState(0);

  const RegisterSchema = Yup.object().shape({
    peso: Yup.string()
      .min(2, 'Tu nombre debe tener más de 1 caracter')
      .max(50, 'Tu nombre no puede tener más de 50 caractéres')
      .required('Se requiere que ingreses el primer nombre'),
    altura: Yup.string()
      .min(2, 'Tu apellido debe tener más de 1 caracter')
      .max(50, 'Tu apellido no puede tener más de 50 caractéres')
      .required('Apellido requerido'),
    matricula: Yup.string()
      .min(2, 'Tu matricula debe tener más de 1 dígito')
      .max(50, 'Tu matricula no puede tener más de 15 dígitos')
      .required('matricula requerido'),
    fecha: Yup.date(),
    diametro: Yup.string().min(2, 'Debe ser un número').required('diametro requerido'),
    observaciones: Yup.string().required('observaciones requerida')
  });

  const formik = useFormik({
    initialValues: {
      fechaControl: '',
      matricula: '',
      peso: '',
      altura: '',
      diametro: '',
      observaciones: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (initialValues) => {
        agregarRegistro(initialValues)
      // navigate('/dashboard', { replace: true });
    }
  });

  const agregarRegistro = async function (initialValues) {
      let res = await agregarRegistroPedriatrico(
          hijo,
          initialValues.fechaControl,
          initialValues.matricula,
          initialValues.peso,
          initialValues.altura,
          initialValues.diametro,
          initialValues.observaciones,
          estudios,
          medicamentos
      )
    if (res.isSuccess) {
        let copyHijos = [...props.hijos];
        let index = copyHijos.findIndex((obj) => obj._id == hijo);
        copyHijos[index].pediatricRegistries.push(res.registro);
        props.setHijos([...copyHijos]);
        props.handleClose();
    } else {
        console.log(res.isSuccess);
        alert(res.message);
    }
  };

  const handleAddEstudio = (estudio) => {
    setEstudios(estudios => [...estudios, estudio]);
  };

  const handleDeleteEstudio = (estudioBorrado, index) => {
    setEstudios(estudios.filter(estudio => estudio !== estudioBorrado))
  };

  const handleAddMedicamento = (medicamento) => {
    setMedicamentos(medicamentos => [...medicamentos, medicamento]);
  };

  const handleDeleteMedicamento = (medicamentoBorrado, index) => {
    setMedicamentos(medicamentos.filter(medicamento => medicamento !== medicamentoBorrado))
  };

  const handleChange = (event) => {
    setHijo(event.target.value);
  };

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const debug = true;

  return (
      <Stack>
          <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div>&nbsp;</div>
        <InputLabel id="hijo">Hijo</InputLabel>
            <Select
              labelId="Hijo"
              id="hijo"
              value={hijo}
              label="Hijo"
              onChange={handleChange}
            >
                {props.hijos.map((hijo) => 
                    <MenuItem value={hijo._id}>{hijo.name + " " + hijo.lastName}</MenuItem>
                )}
            </Select>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            type="date"
            label="Fecha del control"
            {...getFieldProps('fechaControl')}
            error={Boolean(touched.fecha && errors.fecha)}
            helperText={touched.fecha && errors.fecha}
          />
          <TextField
            fullWidth
            label="Matrícula médico"
            {...getFieldProps('matricula')}
            error={Boolean(touched.matricula && errors.matricula)}
            helperText={touched.matricula && errors.firstNmatriculaame}
          />
        </Stack>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Peso (kg)"
              {...getFieldProps('peso')}
              error={Boolean(touched.peso && errors.peso)}
              helperText={touched.peso && errors.peso}
            />
            <TextField
              fullWidth
              label="Altura (cm)"
              {...getFieldProps('altura')}
              error={Boolean(touched.altura && errors.altura)}
              helperText={touched.altura && errors.altura}
            />
            <TextField
              fullWidth
              label="Diámetro cabeza (cm)"
              {...getFieldProps('diametro')}
              error={Boolean(touched.diametro && errors.diametro)}
              helperText={touched.diametro && errors.diametro}
            />
          </Stack>
          <Stack>
            <TextField
              fullWidth
              variant="outlined"
              label="Observaciones"
              {...getFieldProps('observaciones')}
              error={Boolean(touched.observaciones && errors.observaciones)}
              helperText={touched.observaciones && errors.observaciones}
            />
          </Stack>
          {/* <Stack>
            <Formik
              initialValues={{ medicam: [''] }}
              onSubmit={(values) => {
                    console.log("Values");
                    console.log(values);
                    setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                }, 500)}
              }
              render={({ values }) => (
                <Form>
                  <FieldArray
                    name="medicam"
                    render={(arrayHelpers) => (
                      <div>
                        {values.medicam && values.medicam.length > 0 ? (
                          values.medicam.map((friend, index) => (
                            <div key={index}>
                              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField
                                  fullWidth
                                  label="Nombre medicamento"
                                  name={`medicam.${index}`}
                                />
                                <TextField
                                  fullWidth
                                  label="Dosis"
                                  name={`medicam.${index} && dosis`}
                                />
                              </Stack>
                              <div>&nbsp;</div>
                              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField
                                  InputLabelProps={{ shrink: true }}
                                  label="Desde"
                                  type="date"
                                  name={`medicam.${index} && desde`}
                                />
                                <TextField
                                  InputLabelProps={{ shrink: true }}
                                  label="Hasta"
                                  type="date"
                                  name={`medicam.${index} && hasta`}
                                />
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => {
                                    arrayHelpers.remove(index);
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => {
                                    arrayHelpers.insert(index, '');
                                  }}
                                >
                                  <AddIcon />
                                </IconButton>
                              </Stack>
                            </div>
                          ))
                        ) : (
                          <Button
                            variant="text"
                            onClick={() => {
                              arrayHelpers.push('');
                            }}
                          >
                            Agregar medicamento
                          </Button>
                        )}
                      </div>
                    )}
                  />
                </Form>
              )}
            />
          </Stack> */}
          {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <ChipInput
              fullWidth
              label="Medicamentos"
              value={medicamentos}
              onAdd={(medicamento) => handleAddMedicamento(medicamento)}
              onDelete={(medicamento, index) => handleDeleteMedicamento(medicamento, index)}
            />
          </Stack> */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <ChipInput
              fullWidth
              label="Estudios médicos a realizar"
              value={estudios}
              onAdd={(estudio) => handleAddEstudio(estudio)}
              onDelete={(estudio, index) => handleDeleteEstudio(estudio, index)}
            />
          </Stack>
          <Button color="secondary">Adjuntar estudio médico previo</Button>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Agregar registro pediátrico
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
      </Stack>
  );
}

export { RegistroPediatricoForm };
