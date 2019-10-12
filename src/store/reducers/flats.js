import * as actionTypes from '../actions/actionTypes';
import GenFlats from "../../shared/setFlats";
import { updateObject } from '../../shared/utility/index';

const initialState = {
    flats: []
}

const setFlats = state => updateObject(state, { flats: GenFlats.setNewFlats() } )
const resetFlats = state => updateObject( state, { flats: []} )

const removeFlat = (state, action) => {
    const newFlatsArr = state.flats.filter( flat => flat.id !== +action.flatId )
    return updateObject( state, { flats: newFlatsArr} )
}

const getFlat = (state, action) => {
    let selectedFlat = state.flats.filter( flat => flat.id === +action.flatId )
    if(selectedFlat.length) {
        selectedFlat = selectedFlat[0];
    }
    return updateObject( state, {selectedFlat} )
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_FLATS: return setFlats(state);
        case actionTypes.RESET_FLATS: return resetFlats(state, action);
        case actionTypes.GET_FLAT: return getFlat(state, action);
        case actionTypes.REMOVE_FLAT: return removeFlat(state, action);
        default:
            return state;
    }
};

export default reducer;