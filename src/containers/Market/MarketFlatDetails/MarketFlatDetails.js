import React from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions';
import classes from './MarketFlatDetails.module.css';
import { rentIncome, GetPriceWithSpaces } from '../../../shared/utility/prices';

const MarketFlatDetails = ({ match, history }) => {
  const flatsImages = require.context('../../../assets/images/flats', true);
  const streetsImages = require.context('../../../assets/images/streets', true);
  const dispatch = useDispatch();
  const flats = useSelector((state) => state.flats.flats);
  const flatsNumber = useSelector((state) => state.trader.flats.length);
  const fortune = useSelector((state) => state.trader.fortune);
  const flatId = match.params.id;
  const [flat] = flats.filter((flatItem) => flatItem.id === +flatId);

  if (!flat) return (<Redirect to="/my-flats" />);

  const img = flatsImages(`./${flat.img}`);
  const str = streetsImages(`./${flat.strImg}`);
  const rentMoney = rentIncome(flat);
  let luxury = null;
  let balance = true;

  const purchaseTax = (price) => {
    if (price < 40000) {
      return { taxPrice: Math.floor(price * 1.1), tax: '10%' };
    }
    if (price < 80000) {
      return { taxPrice: Math.floor(price * 1.2), tax: '20%' };
    }
    return { taxPrice: Math.floor(price * 1.3), tax: '30%' };
  };

  const { taxPrice, tax } = purchaseTax(flat.price);
  let totalPrice = taxPrice;

  if (flatsNumber > 1) {
    totalPrice *= (flatsNumber * flatsNumber) / 3;
    luxury = (
      <>
        <p>{`You are rich! You have got ${flatsNumber} flats`}</p>
        <p>Extra tax for luxury!$$$</p>
      </>
    );
  }

  const buyFlat = () => {
    history.push('/my-flats');
    dispatch(actions.buyFlat(flat, totalPrice));
  };

  if (fortune - totalPrice <= 0) {
    balance = false;
  }

  return (
    <div className="row">
      <div className="col-sm-6">
        <div className="card border-success">
          <div className="card-body text-success text-center">
            <img className={`${classes.img} img-thumbnail`} alt="" src={img} />
            <img className={`${classes.img} img-thumbnail`} alt="" src={str} />
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <h1 className="text-center">Flat details</h1>
        <p>{`Location: ${flat.location}`}</p>
        <p>{`Price: ${GetPriceWithSpaces(flat.price)} $`}</p>
        <p>{`Rent per month: ${GetPriceWithSpaces(rentMoney)} $`}</p>
        <p>{`Square: ${flat.square}`}</p>
        <p>{`Taxes: ${tax}`}</p>
        <p>{`Price + taxes: ${GetPriceWithSpaces(taxPrice)} $`}</p>
        {luxury}
        <p>{`Total price: ${GetPriceWithSpaces(totalPrice)}$`}</p>
        <button type="button" className="btn btn-success" disabled={!balance} onClick={buyFlat}>Buy</button>
        { !balance ? <p>Insufficient Funds</p> : null }
      </div>
    </div>
  );
};

MarketFlatDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default MarketFlatDetails;
