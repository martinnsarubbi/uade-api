/* eslint-disable */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { agregarVacuna } from 'src/controller/UserController';

// ----------------------------------------------------------------------

export default function UserRegistrarVacuna({ id }) {

  const [open, setOpen] = React.useState(false);
  const [vacuna, setVacuna] = React.useState('');
  const [observaciones, setObservaciones] = React.useState('');
  const [lugarDeAplicacion, setLugarDeAplicacion] = React.useState('');
  const [fecha, setFecha] = React.useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const openRegistrarVacunaModal = (event, id) => {
    handleOpen();
    console.log(event);
    console.log(id);
  };

  const handleLugarDeAplicacion = (event) => {
    setLugarDeAplicacion(event.target.value);
  };

  const handleObservaciones = (event) => {
    setObservaciones(event.target.value);
  };

  const handleSubmit = () => {
        const vacunaAplicada = {
            "vaccineName": vacuna.label,
            "vaccinationDate": fecha,
            "observations": observaciones,
            "location": lugarDeAplicacion

        }
        agregarVacuna(id, vacunaAplicada)
        handleClose();
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };

  const vacunas = [
    { id: 0, edad: '0Meses', label: 'BCG (0 Meses)' },
    { id: 1, edad: '0Meses', label: 'Hepatitis B (0 Meses)' },
    { id: 2, edad: '2Meses', label: 'Pentavalente (a) (2 Meses)' },
    { id: 3, edad: '2Meses', label: 'Rotavirus (2 Meses)' },
    { id: 4, edad: '2Meses', label: 'SALK (Poliomielitis) (2 Meses)' },
    { id: 5, edad: '2Meses', label: 'Neumococo Conjugada (2 Meses)' },
    { id: 6, edad: '3Meses', label: 'Meningococo A/C/W/Y (3 Meses)' },
    { id: 7, edad: '4Meses', label: 'Pentavalente (a) (4 Meses)' },
    { id: 8, edad: '4Meses', label: 'Rotavirus (4 Meses)' },
    { id: 9, edad: '4Meses', label: 'SALK (Poliomielitis) (4 Meses)' },
    { id: 10, edad: '4Meses', label: 'Neumococo Conjugada (4 Meses)' },
    { id: 11, edad: '5Meses', label: 'Meningococo A/C/W/Y (5 Meses)' }
  ];

  return (
    <>
      <Button onClick={(event) => openRegistrarVacunaModal(event, id)}>Agregar Vacuna</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={vacunas}
            sx={{ width: 300 }}
            onChange={(event, newVacuna) => {
              setVacuna(newVacuna);
            }}
            renderInput={(params) => <TextField {...params} label="Vacuna" />}
          />
          <br />
          <TextField onChange={handleLugarDeAplicacion} />
          <br />
          <br />
          <TextField onChange={handleObservaciones} />
          <br />
          <br />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Fecha de Vacunacion"
              value={fecha}
              onChange={(newFecha) => {
                setFecha(newFecha);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <br />
          <br />
          <Button variant="outlined" onClick={handleSubmit}>
            Registrar
          </Button>
        </Box>
      </Modal>
    </>
  );
}
