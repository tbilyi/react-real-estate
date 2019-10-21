import React from 'react';
import { PropTypes } from 'prop-types';
import MarketFlatDetailsItem from '../../../components/MarketFlatDetailsItem/MarketFlatDetailsItem';

const MarketFlatDetails = ({ match, history }) => (
  <MarketFlatDetailsItem match={match} history={history} />
);

MarketFlatDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default MarketFlatDetails;
