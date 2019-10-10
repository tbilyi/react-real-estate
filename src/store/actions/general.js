import * as actionTypes from './actionTypes';

export const endPeriod = (period) => {
    return dispatch => {
        dispatch( resetFlats() )
        dispatch( changePeriod(period) )
    }
};

export const resetFlats = () => {
    return {
        type: actionTypes.RESET_FLATS
    };
}

export const changePeriod = (period) => {
    return {
        type: actionTypes.CHANGE_PERIOD,
        period
    };
}