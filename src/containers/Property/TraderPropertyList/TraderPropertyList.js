import React from 'react';
import { useSelector } from 'react-redux';
import TraderPropertyItem from '../../../components/TraderPropertyItem/TraderPropertyItem';
import TraderFlats from '../../../components/TraderFlats/TraderFlats';

const TraderPropertyList = () => {
  const flats = useSelector((state) => state.trader.flats);
  return (
    <TraderFlats>
      <>
        { flats.length ? flats.map((flat) => (
          <TraderPropertyItem
            key={flat.id}
            id={flat.id}
            price={flat.price}
            squre={flat.square}
            condition={flat.condition}
            district={flat.district}
            img={flat.img}
            location={flat.location}
            rented={flat.rented}
          />
        ))
          : (
            <tr className="table-active">
              <th colSpan="4" scope="row">There are no flats yet</th>
            </tr>
          )}
      </>
    </TraderFlats>
  );
};

export default TraderPropertyList;
