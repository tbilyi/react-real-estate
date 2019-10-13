import React from 'react';
import { useSelector } from 'react-redux';
import TraderPropertyItem from '../../../components/TraderPropertyItem/TraderPropertyItem';

const TraderPropertyList = () => {
  const flats = useSelector((state) => state.trader.flats);
  return (
    <div>
      <div className="card">
        <div className="card-header">
            Flats
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Adress</th>
                <th scope="col">Condition</th>
                <th scope="col">Neighbourhood</th>
                <th scope="col">Rent</th>
              </tr>
            </thead>
            <tbody>
              {flats.map((flat) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TraderPropertyList;
