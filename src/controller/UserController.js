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

export const getHijos = async function () {
    let user = JSON.parse(localStorage.getItem('user'));
    let token = localStorage.getItem('token');
    console.log("User");
    console.log(user);
    try {
        const response = await fetch(urlWebServices.getHijos, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'x-access-token': token
          },
          body: JSON.stringify({ 'userId': user._id })
        });
        const status = response.status;
        let data = await response.json();
        switch(status) {
            case 201: {
                console.log("case");
                console.dir(data);
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

export const crearHijo = async function (name, lastName, dni, birthDate, bloodType, chronicConditions, allergies) {
    let user = JSON.parse(localStorage.getItem('user'));
    let token = localStorage.getItem('token');
    console.log("User");
    console.log(user);
    console.log(name);
    console.log(lastName);
    console.log(dni);
    console.log(birthDate);
    console.log(processBloodType(bloodType));
    console.log(processEnfermedades(chronicConditions));
    console.log(processAlergias(allergies));
    try {
        const response = await fetch(urlWebServices.crearHijo, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'x-access-token': token
          },
          body: JSON.stringify({ 
              'userId': user._id,
              'name': name,
              'lastName': lastName,
              'dni': dni,
              'birthDate': birthDate,
              'bloodType': processBloodType(bloodType),
              'chronicConditions': processEnfermedades(chronicConditions),
              'allergies': processAlergias(allergies)
            })
        });
        const status = response.status;
        let data = await response.json();
        switch(status) {
            case 201: {
                console.log("case");
                console.dir(data);
                // return ({ isLogin: true, message: "Ok" })
                break;
            }
            default: {
                // return ({isLogin: false, message: "Usuario no encontrado"})
            }
        }
    
      } catch (error){
        console.error(error);
      }
};

function processBloodType(bloodType) {
    switch(bloodType) {
        case 0: 
            return 'A +';
            break;
        case 1: 
            return 'A -';
            break;
        case 2: 
            return 'B +';
            break;
        case 3: 
            return 'B -';
            break;
        case 4: 
            return 'O +';
            break;
        case 5: 
            return 'O -';
            break;
        case 6: 
            return 'AB +';
            break;
        case 7: 
            return 'AB -';
            break;
    }
}

function processEnfermedades(enfermedades) {
    let array = [];
    for (const enfermedad of enfermedades) {
        array.push({"conditionName": enfermedad})
    }
    return array;
}

function processAlergias(alergias) {
    let array = [];
    for (const alergia of alergias) {
        array.push({"allergyName": alergia})
    }
    return array;
}