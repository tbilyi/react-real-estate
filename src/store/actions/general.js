import * as actionTypes from './actionTypes';
import {
  instance as axios, signUpUrl, logInUrl, webKey,
} from '../../axios';

export const resetFlats = () => ({
  type: actionTypes.RESET_FLATS,
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const saveToken = (token, userId) => ({
  type: actionTypes.SAVE_TOKEN,
  idToken: token,
  userId,
});

export const getTraderData = (traderData) => ({
  type: actionTypes.GET_TRADER_DATA,
  traderData,
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

const getUserData = (queryParams, userId) => axios.get(`/user/${userId}.json${queryParams}`);
const postUserData = (token, data, userId) => axios.post(`/user/${userId}.json?auth=${token}`, data);
const putUserData = (token, data, userId) => axios.put(`/user/${userId}.json?auth=${token}`, data);

const authSuccess = (token, userId) => (dispatch) => {
  dispatch(saveToken(token, userId));
  const queryParams = `?auth=${token}`;

  async function getData() {
    const servData = await getUserData(queryParams, userId);
    return servData;
  }

  getData().then((res) => {
    const dataKeys = Object.keys(res.data);
    if (dataKeys) {
      dispatch(getTraderData(res.data));
    }
  }).catch((err) => {
    console.log(err);
  });
};

export const signUp = (email, password, isRegistered) => (dispatch) => {
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  let url = signUpUrl + webKey;
  if (isRegistered === 1) url = logInUrl + webKey;
  axios.post(url, authData)
    .then((response) => {
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', response.data.localId);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch((err) => {
      dispatch(authFail(err.response.data.error.message));
    });
};

export const changePeriod = (period) => ({
  type: actionTypes.CHANGE_PERIOD,
  period,
});

export const endPeriod = (period) => (dispatch) => {
  dispatch(resetFlats());
  dispatch(changePeriod(period));
};

export const saveData = (trader, token, userId) => () => {
  const queryParams = `?auth=${token}&uid="${userId}"`;
  async function getData() {
    const servData = await getUserData(queryParams, userId);
    return servData;
  }
  const data = { ...trader, userId };
  getData().then((res) => {
    if (res) {
      putUserData(token, data, userId).then((res) => {
        console.log(res);
      });
    } else {
      postUserData(token, data, userId).then((res) => {
        console.log(res);
      });
    }
  });
};
