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
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function RegistroPediatricoForm() {
  const navigate = useNavigate();
  const [showobservaciones, setShowobservaciones] = useState(false);

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
    diametro: Yup.string().min('Debe ser un número').required('diametro requerido'),
    observaciones: Yup.string().required('observaciones requerida')
  });

  const [bloodType, setBloodType] = React.useState('');

  const handleChange = (event) => {
    setBloodType(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      peso: '',
      altura: '',
      matricula: '',
      fecha: '',
      diametro: '',
      observaciones: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const estudios = [];

  const handleAddEstudio = (estudio) => {
    estudios.push(estudio);
  };

  const handleDeleteEstudio = (estudios, index) => {
    if (index > -1) {
      estudios.splice(index, 1);
    }
  };

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div>&nbsp;</div>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            type="date"
            label="Fecha del control"
            {...getFieldProps('fecha')}
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
          <Stack>
            <Formik
              initialValues={{ medicam: [''] }}
              onSubmit={(values) =>
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                }, 500)
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
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <ChipInput
              fullWidth
              label="Estudios médicos a realizar"
              value={estudios}
              onAdd={(estudio) => handleAddEstudio(estudio)}
              onDelete={(estudio, index) => handleDeleteEstudio(estudios, index)}
            />
          </Stack>
          <Button color="secondary">Adjuntar estudio médico previo</Button>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Agregar registro pediátrico
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

export { RegistroPediatricoForm };
