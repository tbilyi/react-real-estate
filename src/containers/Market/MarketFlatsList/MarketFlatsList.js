import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MarketFlatItem from '../../../components/MarketFlatItem/MarketFlatItem';
import * as actions from '../../../store/actions/index';

const MarketFlatsList = () => {
  const dispatch = useDispatch();
  const flats = useSelector((state) => state.flats.flats);

  if (!Object.entries(flats).length) {
    dispatch(actions.setFlats());
  }

  return (
    <div className="row">
      { flats.map((flat) => (
        <MarketFlatItem
          key={flat.id}
          id={flat.id}
          price={flat.price}
          square={flat.square}
          condition={flat.condition}
          flatImg={flat.img}
          strImg={flat.strImg}
          location={flat.location}
          rented={flat.rented}
        />
      )) }
    </div>
  );
};

export default MarketFlatsList;
