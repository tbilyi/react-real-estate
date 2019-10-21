import React from 'react';
import { PropTypes } from 'prop-types';
import TraderPropertyDetailsItem from '../../../components/TraderPropertyDetailsItem/TraderPropertyDetailsItem';

const TraderPropertyDetails = ({ match, history }) => (
  <TraderPropertyDetailsItem match={match} history={history} />
);

TraderPropertyDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default TraderPropertyDetails;
