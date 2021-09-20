import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const users = [
  {
    id: faker.datatype.uuid(),
    name: 'Olivia González',
    edad: '3 meses',
    status: 'Vacunacion ok',
    role: 'Próximo control pediatrico: 10/10/2021'
  },
  {
    id: faker.datatype.uuid(),
    name: 'Álvaro Diaz',
    edad: '15 meses',
    status: 'Vacunacion vencida',
    role: 'Vacuna vencida: 20/09/2021'
  }
];

export default users;
