import React from 'react';
import { PropTypes } from 'prop-types';

const TraderFlats = ({ children }) => (
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
            { children }
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

TraderFlats.propTypes = {
  children: PropTypes.element.isRequired,
};
export default TraderFlats;
