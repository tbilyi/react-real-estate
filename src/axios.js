import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://react-real-estate-tbilyi.firebaseio.com/'
});

export const signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
export const logInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
export const webKey = 'AIzaSyD5Yu0VdIBlr7ecc55UBV4qPWejdFaHuUs';
