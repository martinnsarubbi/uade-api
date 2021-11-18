/* eslint-disable */

import { urlWebServices } from './webServices';

export const login = async function (email, password) {
  try {
    const response = await fetch(urlWebServices.login, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'email': email, 'password': password })
    });
    const status = response.status;
    let data = await response.json();
    console.log(data);
    switch(status) {
        case 201: {
            console.log("case");
            localStorage.setItem("token", data.loginUser.token);
            localStorage.setItem("user", JSON.stringify(data.loginUser.user));
            return ({ isLogin: true, message: "Ok" })
            break;
        }
        default: {
            return ({isLogin: false, message: "Usuario no encontrado"})
        }
    }

  } catch (error){
    console.error(error);
  }
};

export const register = async function ({ firstName, lastName, dni, telephone, email, password }) {
    try {
        const response = await fetch(urlWebServices.register, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
              'name': firstName, 
              'lastName': lastName,
              'dni': dni,
              'telephone': telephone,
              'email': email,
              'password': password 
            })
        });
        const status = response.status;
        let data = await response.json();
        console.log(data);
        switch(status) {
            case 201: {
                console.log("case");
                return ({ isRegistered: true, message: "Ok" })
                break;
            }
            default: {
                return ({ isRegistered: false, message: "No se pudo completar el registro" })
            }
        }
    
      } catch (error){
        console.error(error);
      }
}