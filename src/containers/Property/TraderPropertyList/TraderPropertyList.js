import React from 'react';
import { useSelector  } from 'react-redux';
import TraderPropertyItem from "../../../components/TraderPropertyItem/TraderPropertyItem";

const TraderPropertyList = () => {

    const flats = useSelector(state => state.trader.flats)

    return (
        <div className="row">{ flats.map( (flat)=>(
            <TraderPropertyItem
                key={flat.id}
                id={flat.id}
                price={flat.price}
                squre={flat.squre}
                condition={flat.condition}
                img={flat.img}
                location={flat.location}
                rented={flat.rented}
            >
            </TraderPropertyItem>
        )) }</div>
    )
};

export default TraderPropertyList;