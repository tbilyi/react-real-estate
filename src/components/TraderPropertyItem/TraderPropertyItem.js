import React from 'react';
import '../MarketFlatItem/MarketFlatItem.css'
import { NavLink } from "react-router-dom";
import { GetPriceWithSpaces } from '../../shared/utility/prices'

const TraderPropertyItem = (props) =>  {

    return (
        <div className="col-sm-6 col-md-4 mr-item">
            <div className="card border-success">
                <div className="card-header text-white bg-success ">{ props.location }&nbsp;
                    <small>
                        Price: { GetPriceWithSpaces(props.price) }&nbsp;$;&nbsp;
                    </small>
                    <small>
                        Rent per month: $
                    </small>
                </div>
                <div className="card-body text-success text-center">
                    <NavLink
                        to={`/my-flats/flat/${props.id}`}>
                        <img alt="" width="250" height="200" src={ require(`../../assets/images/flats/${props.img}`) } />
                    </NavLink>
                </div>
            </div>
        </div>
    )
};

export default TraderPropertyItem