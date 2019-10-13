import React from 'react';
import { PropTypes } from 'prop-types';
import { NavLink } from 'react-router-dom';
import { GetPriceWithSpaces } from '../../shared/utility/prices';

const MarketFlatItem = ({
  id,
  location,
  square,
  flatImg,
  strImg,
  price,
}) => {
  const flatsImages = require.context('../../assets/images/flats', true);
  const streetsImages = require.context('../../assets/images/streets', true);
  const img = flatsImages(`./${flatImg}`);
  const str = streetsImages(`./${strImg}`);
  return (
    <div className="col-sm-6 col-md-4 mr-item">
      <div className="card border-success">
        <div className="card-header text-white bg-success text-center">
          {location}
          <div className="font-italic">
            {`${square} m&sup2;`}
          </div>
        </div>
        <div className="card-body text-success text-center">
          <NavLink
            to={`/market/flat/${id}`}
          >
            <img className="imgFrame" alt="" width="250" height="200" src={img} />
            <img className="imgFrame" alt="" width="250" height="200" src={str} />
          </NavLink>
        </div>
        <div className="card-footer text-muted text-center font-weight-bold">
          {`${GetPriceWithSpaces(price)}$ (${GetPriceWithSpaces(price / square)}$ for m&sup2;)`}
        </div>
      </div>
    </div>
  );
};

MarketFlatItem.propTypes = {
  id: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  square: PropTypes.number.isRequired,
  flatImg: PropTypes.string.isRequired,
  strImg: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default MarketFlatItem;
