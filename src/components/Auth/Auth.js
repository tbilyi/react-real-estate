import React from 'react';
import { PropTypes } from 'prop-types';

const Auth = ({ setRegistered }) => (
  <div className="card">
    <div className="card-body">
      <h2>You are not authorised, please log in:</h2>
      <button className="btn btn-primary" type="submit" onClick={() => setRegistered(1)}>Log In</button>
      <h2>Or create new account:</h2>
      <button className="btn btn-primary" type="submit" onClick={() => setRegistered(2)}>Sign Up</button>
    </div>
  </div>
);

Auth.propTypes = {
  setRegistered: PropTypes.func.isRequired,
};

export default Auth;
