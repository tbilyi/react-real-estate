import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { getIncome } from '../../shared/utility/prices';

const initialState = {
  flats: [],
  fortune: 150000,
  age: 35,
  period: 0,
  income: 0,
};

const addUserFlat = (state, { price, flat }) => {
  const Fl = [...state.flats];
  const ft = state.fortune - price;
  Fl.push(flat);
  return updateObject(state, { flats: Fl, fortune: ft });
};

const sellFlat = (state, { flatId, price }) => {
  const Fl = state.flats.filter((flat) => flat.id !== +flatId);
  const fortune = state.fortune + price;
  const income = getIncome(Fl);
  return updateObject(state, { flats: Fl, fortune, income });
};

const rentFlat = (state, { flatId }) => {
  const Fl = state.flats.map((flat) => {
    if (flat.id === +flatId) flat.rented = true;
    return flat;
  });
  const income = getIncome(Fl);
  return updateObject(state, { flats: Fl, income });
};

const changePeriod = (state, { period }) => {
  const newPeriod = state.period + period;
  const age = state.age + period / 365;
  const fortune = state.income * period + state.fortune;
  return updateObject(state, { period: newPeriod, age, fortune });
};

const getTraderData = (state, {
  flats, fortune, age, period, income,
}) => updateObject(state, {
  flats, fortune, age, period, income,
});

const upgradeFlat = (state, { flatId, price }) => {
  const Fl = state.flats.map((flat) => {
    if (flat.id === +flatId) {
      flat.img = flat.img.replace(`c${flat.condition}`, `c${flat.condition + 1}`);
      flat.condition += 1;
      flat.price += flat.price * 0.4;
    }
    return flat;
  });
  const fortune = state.fortune - price;
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
    case actionTypes.GET_TRADER_DATA: return getTraderData(state, action.traderData);
    default:
      return state;
  }
};

export default reducer;
