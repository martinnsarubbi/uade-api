// const urlApi = 'http://localhost:4000/'
const urlApi = 'https://uade-api-back-end.herokuapp.com'

export const urlWebServices = {
  login: `${urlApi}/api/users/login`,
  register: `${urlApi}/api/users/registration`,
  getHijos: `${urlApi}/api/children/childrenById`,
  crearHijo: `${urlApi}/api/children/createChild`,
  agrearRegistroPedriatrico: `${urlApi}/api/registries/createRegistry`
}
