import * as actionTypes from './actionTypes';

export const setFlats = () => {
    return {
        type: actionTypes.SET_FLATS
    };
};

export const rentIncome = (flatId) => {
    return {
        type: actionTypes.RENT_INCOME,
        flatId
    };
};

export const removeFlat = (flatId) => {
    return {
        type: actionTypes.REMOVE_FLAT,
        flatId
    };
};

export const sellFlat = (flatId, price) => {
    return {
        type: actionTypes.SELL_FLAT,
        flatId,
        price
    };
};

export const rentFlat = (flatId) => {
    return {
        type: actionTypes.RENT_FLAT,
        flatId
    };
};

export const addUserFlat = (flat, price) => {
    return {
        type: actionTypes.ADD_USER_FLAT,
        flat,
        price
    };
};


export const buyFlat = (flat, price) => {
    return dispatch => {
        dispatch( removeFlat(flat.id) )
        dispatch( addUserFlat(flat, price) )
    }
};

export const upgradeFlat = (flatId, price) => {
    return {
        type: actionTypes.UPGRADE_FLAT,
        flatId,
        price
    };
};

