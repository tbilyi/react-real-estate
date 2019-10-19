import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility/index';

const initialState = {
  error: null,
  token: null,
  userId: null,
};

const authFail = (state, { error }) => updateObject(state, {
  error,
});

const saveToken = (state, { idToken, userId }) => updateObject(state, {
  token: idToken,
  userId,
  error: null,
});

const authLogout = (state) => updateObject(state, { token: null, userId: null });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.SAVE_TOKEN: return saveToken(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
