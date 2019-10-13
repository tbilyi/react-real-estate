import React from 'react';
import { PropTypes } from 'prop-types';
import '../MarketFlatItem/MarketFlatItem.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TraderPropertyItem = ({
  id,
  location,
  district,
  condition,
  rented,
}) => {
  const apartmentCondition = useSelector((state) => state.todos.apartmentCondition);
  const neighbourhood = useSelector((state) => state.todos.neighbourhood);

  return (
    <>
      <tr className="table-active">
        <th scope="row">
          <NavLink to={`/my-flats/flat/${id}`}>
            {location}
          </NavLink>
        </th>
        <td>{neighbourhood(district)}</td>
        <td>{apartmentCondition(condition)}</td>
        <td>{rented ? '+' : '-'}</td>
      </tr>
    </>
  );
};

TraderPropertyItem.propTypes = {
  id: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  district: PropTypes.number.isRequired,
  condition: PropTypes.number.isRequired,
  rented: PropTypes.bool.isRequired,
};

export default TraderPropertyItem;
