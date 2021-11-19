/* eslint-disable */

import * as React from 'react';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getHijos } from '../controller/UserController';

const columns = [
  { id: 'nombreVacuna', label: 'Vacuna', minWidth: 170 },
  { id: 'fechaAplicacion', label: 'Fecha de aplicación', minWidth: 100 },
  { id: 'institucion', label: 'Institución', minWidth: 100 },
  { id: 'marca', label: 'Marca', minWidth: 100 }
];

function createData(nombreVacuna, fechaAplicacion, institucion, marca) {
  return { nombreVacuna, fechaAplicacion, institucion, marca };
}

const rows = [
  createData('BCG', '01/01/2020', 'Hospital Garrahan', 'X'),
  createData('Hepatitis B', '01/01/2020', 'Hospital Garrahan', 'Y'),
  createData('Neumococo Conjugada 13 Valente', '01/01/2020', 'Hospital Garrahan', 'Z'),
  createData('Quíntuple o pentavalente', '-', '-', '-'),
  createData('IPV', '-', '-', '-'),
  createData('Rotavirus', '-', '-', '-')
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [age, setAge] = React.useState('');
  const [hijos, setHijos] = React.useState([]);

  React.useEffect(() => {
      getHijos().then(data => {
          setHijos([...data.hijos])})
  }, [])

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography variant="h4">Calendario de vacunación</Typography>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label=""
            onChange={handleChange}
          >
            <MenuItem value={10}>Olivia Diaz</MenuItem>
            <MenuItem value={20}>Álvaro Diaz</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof value === 'number' ? column.format(value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
