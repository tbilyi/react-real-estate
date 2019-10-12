import React from 'react';
import { NavLink } from "react-router-dom";
import { GetPriceWithSpaces } from '../../shared/utility/prices'

const MarketFlatItem = (props) =>  {
    return (
        <div className="col-sm-6 col-md-4 mr-item">
            <div className="card border-success">
                <div className="card-header text-white bg-success text-center">{ props.location }
                    <div className="font-italic">
                        { props.square } m&sup2;
                    </div>
                </div>
                <div className="card-body text-success text-center">
                    <NavLink
                        to={`/market/flat/${props.id}`}>
                        <img className="imgFrame" alt="" width="250" height="200" src={ require(`../../assets/images/flats/${props.img}`) } />
                        <img className="imgFrame" alt="" width="250" height="200" src={ require(`../../assets/images/streets/${props.strImg}`) } />
                    </NavLink>
                </div>
                <div className="card-footer text-muted text-center font-weight-bold">
                    { GetPriceWithSpaces(props.price) }$ ({ GetPriceWithSpaces(props.price/props.square) }$ for m&sup2;)
                </div>
            </div>
        </div>
    )
};

export default MarketFlatItem