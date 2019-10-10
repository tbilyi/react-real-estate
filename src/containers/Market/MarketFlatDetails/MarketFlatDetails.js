import React from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from "../../../store/actions";
import classes from './MarketFlatDetails.module.css'
import { rentIncome, GetPriceWithSpaces } from '../../../shared/utility/prices'

const MarketFlatDetails = props => {

    const purchaseTax = (price) => {
        if ( price < 40000) {
            return { taxPrice: Math.floor(price * 1.1), tax: "10%" };
        } else if ( price < 80000) {
            return { taxPrice: Math.floor(price * 1.2), tax: "20%" };
        } else {
            return { taxPrice:  Math.floor(price * 1.3), tax: "30%" };
        }
    }

    const flatId = props.match.params.id,
        dispatch = useDispatch();

    const flats = useSelector(state => {
        return state.flats.flats;
    });

    const flatsNumber = useSelector(state => {
        return state.trader.flats.length;
    });

    const fortune = useSelector(state => {
        return state.trader.fortune;
    });

    let flat = flats.filter( flat => flat.id === +flatId ),
        isFlat = Object.entries(flat).length

    if ( isFlat ) {
        flat = flat[0];
    } else {
        return <Redirect to="/my-flats" />
    }
    
    const buyFlat = () => {
        props.history.push('/my-flats');
        dispatch(actions.buyFlat(flat, totalPrice));
    }

    const rentMoney = rentIncome(flat);
    const taxPrice = purchaseTax(flat.price).taxPrice;
    let totalPrice = taxPrice;

    let luxury = null
    if( flatsNumber > 1 ) {
        totalPrice *= flatsNumber;
        luxury = <React.Fragment>
            <p>You are rich! You have got { flatsNumber } flats</p>
            <p>Extra tax for luxury!$$$</p></React.Fragment>
    }

    let balance = true;
    if( fortune - totalPrice <= 0 ){
        balance = false;
    }

    return (
         <div className="row">
            <div className="col-sm-6">
                <div className="card border-success">
                    <div className="card-body text-success text-center">
                        <img className={classes.img} alt="" src={ require(`../../../assets/images/flats/${flat.img}`) } />
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                <h1 className="text-center">Flat details</h1>
                <p>Location: { flat.location }</p>
                <p>Price: { GetPriceWithSpaces(flat.price) } $</p>
                <p>Rent per month:  { GetPriceWithSpaces(rentMoney) } $ </p>
                <p>Square: { flat.square }</p>
                <p>Taxes: { purchaseTax(flat.price).tax }</p>
                <p>Price + taxes: { GetPriceWithSpaces(taxPrice) } $</p>
                {luxury}
                <p>Total price: { GetPriceWithSpaces(totalPrice) }$</p>
                <button className="btn btn-success" disabled={!balance} onClick={buyFlat}>Buy</button>
                { !balance ? <p>Insufficient Funds</p> : null }
            </div>
        </div>
    )
};

export default MarketFlatDetails;