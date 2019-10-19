import React from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions';
import { rentIncome, GetPriceWithSpaces } from '../../../shared/utility/prices';
import classes from './TraderPropertyDetails.module.css';

const TraderPropertyDetails = ({ match, history }) => {
  const flatsImages = require.context('../../../assets/images/flats', true);
  const dispatch = useDispatch();
  const flats = useSelector((state) => state.trader.flats);
  const fortune = useSelector((state) => state.trader.fortune);
  const flatId = match.params.id;
  const [flat] = flats.filter((flatItem) => flatItem.id === +flatId);

  if (!flat) return (<Redirect to="/my-flats" />);

  const img = flatsImages(`./${flat.img}`);
  let balance = true;
  const rentMoney = rentIncome(flat);
  const rentFlat = () => dispatch(actions.rentFlat(flat.id));
  const extraMoney = (flat.condition === 3) ? flat.price : 0;
  const upgradePrice = Math.floor(
    flat.price * 0.3 + flat.condition * flat.price * 0.1 + extraMoney,
  );
  const upgradeFlat = () => dispatch(actions.upgradeFlat(flat.id, upgradePrice));

  const sellTax = (price) => {
    if (price < 50000) {
      return { taxPrice: Math.floor(price / 1.2), tax: '20%' };
    }
    if (price < 200000) {
      return { taxPrice: Math.floor(price / 1.3), tax: '30%' };
    }
    return { taxPrice: Math.floor(price / 1.4), tax: '40%' };
  };

  const { taxPrice } = sellTax(flat.price);
  const sellFlat = () => {
    history.push('/my-flats');
    dispatch(actions.sellFlat(flat.id, taxPrice));
  };

  if (fortune - upgradePrice <= 0) {
    balance = false;
  }

  return (
    <div className="row">
      <div className="col-sm-6">
        <div className="card border-success">
          <div className="card-body text-success text-center">
            <img className={classes.img} alt="" src={img} />
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <h1 className="text-center">Flat details</h1>
        { flat.rented ? <h3>Flat is being rented!</h3> : null}
        <p>{`Location: ${flat.location}`}</p>
        <p>{`Price: ${GetPriceWithSpaces(flat.price)}$`}</p>
        <p>{`Rent per month: ${GetPriceWithSpaces(rentMoney)}$`}</p>
        { flat.condition < 4 ? (
          <p>{`Upgrade price: ${GetPriceWithSpaces(upgradePrice)}$`}</p>
        ) : null}
        <p>{`Square: ${flat.square}m²`}</p>
        <p>{`Taxes: ${sellTax(flat.price).tax}`}</p>
        <p>{`Price - taxes: ${GetPriceWithSpaces(taxPrice)}$`}</p>
        <div>
          <button type="button" className={`${classes.btnSuccess} btn btn-success`} onClick={sellFlat}>Sell</button>
        </div>
        { !flat.rented ? (
          <div>
            <button type="button" className={`${classes.btnSuccess} btn btn-success`} onClick={rentFlat}>Rent</button>
          </div>
        ) : null }
        { flat.condition < 4 ? (
          <div>
            <button
              type="button"
              className={`${classes.btnSuccess} btn btn-success`}
              disabled={!balance}
              onClick={upgradeFlat}
            >
              Upgrade
            </button>
          </div>
        ) : null }
        { !balance ? <p>Insufficient Funds</p> : null }
      </div>
    </div>
  );
};

TraderPropertyDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default TraderPropertyDetails;
