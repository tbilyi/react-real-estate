import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { getIncome } from '../../shared/utility/prices';

const initialState = {
  flats: [],
  fortune: 100000,
  age: 35,
  period: 0,
  income: 0,
};

const addUserFlat = (state, action) => {
  const Fl = [...state.flats];
  const ft = state.fortune - action.price;
  Fl.push(action.flat);
  return updateObject(state, { flats: Fl, fortune: ft });
};

const sellFlat = (state, action) => {
  const Fl = state.flats.filter((flat) => flat.id !== +action.flatId);
  const fortune = state.fortune + action.price;
  const income = getIncome(Fl);
  return updateObject(state, { flats: Fl, fortune, income });
};

const rentFlat = (state, action) => {
  const Fl = state.flats.map((flat) => {
    if (flat.id === +action.flatId) {
      flat.rented = true;
    }
    return flat;
  });
  const income = getIncome(Fl);
  return updateObject(state, { flats: Fl, income });
};

const changePeriod = (state, action) => {
  const period = state.period + action.period;
  const age = state.age + action.period / 12;
  const fortune = state.income * action.period + state.fortune;
  return updateObject(state, { period, age, fortune });
};


const upgradeFlat = (state, action) => {
  const Fl = state.flats.map((flat) => {
    if (flat.id === +action.flatId) {
      flat.img = flat.img.replace(`c${flat.condition}`, `c${flat.condition + 1}`);
      flat.condition += 1;
      flat.price += flat.price * 0.4;
    }
    return flat;
  });
  const fortune = state.fortune - action.price;
  const income = getIncome(Fl);
  return updateObject(state, { flats: Fl, fortune, income });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
