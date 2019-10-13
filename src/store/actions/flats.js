import * as actionTypes from './actionTypes';

export const setFlats = () => ({
  type: actionTypes.SET_FLATS,
});

export const rentIncome = (flatId) => ({
  type: actionTypes.RENT_INCOME,
  flatId,
});

export const removeFlat = (flatId) => ({
  type: actionTypes.REMOVE_FLAT,
  flatId,
});

export const sellFlat = (flatId, price) => ({
  type: actionTypes.SELL_FLAT,
  flatId,
  price,
});

export const rentFlat = (flatId) => ({
  type: actionTypes.RENT_FLAT,
  flatId,
});

export const addUserFlat = (flat, price) => ({
  type: actionTypes.ADD_USER_FLAT,
  flat,
  price,
});

export const buyFlat = (flat, price) => (dispatch) => {
  dispatch(removeFlat(flat.id));
  dispatch(addUserFlat(flat, price));
};

export const upgradeFlat = (flatId, price) => ({
  type: actionTypes.UPGRADE_FLAT,
  flatId,
  price,
});
