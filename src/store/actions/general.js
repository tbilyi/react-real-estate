import * as actionTypes from './actionTypes';

export const resetFlats = () => ({
  type: actionTypes.RESET_FLATS,
});

export const changePeriod = (period) => ({
  type: actionTypes.CHANGE_PERIOD,
  period,
});

export const endPeriod = (period) => (dispatch) => {
  dispatch(resetFlats());
  dispatch(changePeriod(period));
};
