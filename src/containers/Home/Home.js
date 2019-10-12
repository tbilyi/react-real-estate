import React from 'react';
import { useSelector  } from 'react-redux';
import { GetPriceWithSpaces } from '../../shared/utility/prices'

const Home = () => {

    const trader = useSelector(state => {
        return state.trader;
    });

    return (
            <div className="card">
                <div className="card-header">
                    Params
                </div>
                <div className="card-body">
                    <p>number of flats: { trader.flats.length }</p>
                    <p>currency: { GetPriceWithSpaces(trader.fortune) }$</p>
                    <p>income: { GetPriceWithSpaces(trader.income) }$</p>
                </div>
            </div>
    )
};

export default Home;