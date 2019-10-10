import React from 'react';
import { useSelector  } from 'react-redux';
import { rentIncome, GetPriceWithSpaces } from '../../shared/utility/prices'

const Home = () => {

    const trader = useSelector(state => {
        return state.trader;
    });

    let income = 0;
    for( let i=0; i<trader.flats.length; i++ ){
        if(trader.flats[i].rented){
            income += rentIncome(trader.flats[i])
        }
    }


    return (
        <div className="row">
            <p>number of flats: { trader.flats.length }</p>
            <p>currency: { GetPriceWithSpaces(trader.fortune) }$</p>
            <p>income: { GetPriceWithSpaces(income) }$</p>
        </div>
    )
};

export default Home;