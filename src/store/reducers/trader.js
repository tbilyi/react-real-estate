import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../../shared/utility";
import { rentIncome } from '../../shared/utility/prices'

const initialState = {
    flats: [],
    fortune: 100000,
    age: 35,
    period: 1
}

const addUserFlat = (state, action) => {
    const Fl = [...state.flats],
        ft = state.fortune - action.price;
        Fl.push(action.flat)
    return updateObject( state, { flats: Fl, fortune: ft } )
}

const sellFlat = (state, action) => {
    const Fl = state.flats.filter( flat => flat.id !== +action.flatId ),
        fortune = state.fortune + action.price;
    return updateObject( state, { flats: Fl, fortune } )
}

const rentFlat = (state, action) => {
    const Fl = state.flats.map( flat => {
        if (flat.id === +action.flatId){
            flat.rented = true;
        }
        return flat;
    } )
    return updateObject( state, { flats: Fl } )
}

const changePeriod = (state, action) => {
    const period = state.period + action.period,
        age = state.age + action.period/12;

    let income = 0;
    for( let i=0; i<state.flats.length; i++ ){
        if(state.flats[i].rented){
            income += rentIncome(state.flats[i])
        }
    }
    const fortune = income * action.period + state.fortune
    return updateObject( state, { period, age, fortune } )
}


const upgradeFlat = (state, action) => {
        const Fl = state.flats.map( flat => {
            if (flat.id === +action.flatId){
                flat.img = flat.img.replace('con' + flat.condition, 'con' + (flat.condition + 1) );
                flat.condition++;
                flat.price = flat.price + flat.price * 0.4
            }
            return flat;
        } ),
            fortune = state.fortune - action.price;

    return updateObject( state, { flats: Fl, fortune } )
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_USER_FLAT: return addUserFlat(state, action);
        case actionTypes.SELL_FLAT: return sellFlat(state, action);
        case actionTypes.RENT_FLAT: return rentFlat(state, action);
        case actionTypes.UPGRADE_FLAT: return upgradeFlat(state, action);
        case actionTypes.CHANGE_PERIOD: return changePeriod(state, action);
        default:
            return state;
    }
};

export default reducer;