import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions';

const SignUp = ({ registered }) => {
  const dispatch = useDispatch();
  const [authData, setAuthData] = useState({
    email: {
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
    },
    password: {
      value: '',
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
    },
  });
  const signUp = (event) => {
    event.preventDefault();
    dispatch(actions.signUp(authData.email.value, authData.password.value, registered));
  };
  const error = useSelector((state) => state.auth.error);
  const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== '';
      if (!isValid) return false;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength;
      if (!isValid) return false;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value);
    }
    return isValid;
  };

  const onChangeHandler = (event) => {
    const elName = event.target.dataset.name;
    const elData = {
      ...authData[elName],
      value: event.target.value,
      valid: checkValidity(event.target.value, authData[elName].validation),
    };
    if (elData.valid) {
      event.target.className = 'form-control';
    } else {
      event.target.className = 'form-control is-invalid';
    }
    setAuthData({
      ...authData,
      [elName]: elData,
    });
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          Authorisation
        </div>
        <div className="card-body">
          <h3>
            {error}
          </h3>
          <form onSubmit={signUp} autoComplete="on">
            <div className="row form-group">
              <div className="col-sm-12 col-md-8 col-lg-4 mb-12">
                <label htmlFor="validationServerUsername" />
                  Email
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroupPrepend3">@</span>
                    </div>
                    <input
                      type="text"
                      className="form-control is-invalid"
                      id="validationServerUsername"
                      placeholder="test@test.com"
                      aria-describedby="inputGroupPrepend3"
                      data-name="email"
                      required
                      onChange={(event) => onChangeHandler(event)}
                    />
                    <div className="invalid-feedback">
                      Please choose a correct email.
                    </div>
                  </div>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-12 col-md-8 col-lg-4 mb-12">
                <label htmlFor="inputPassword" />
                  Password
                  <div className="input-group">
                    <input
                      autoComplete="on"
                      type="password"
                      className="form-control"
                      id="inputPassword"
                      placeholder="Password"
                      data-name="password"
                      required
                      onChange={(event) => onChangeHandler(event)}
                    />
                    <div className="invalid-feedback">
                      Password must be more than 6 characters.
                    </div>
                  </div>
              </div>
            </div>
            { registered === 1
              ? <button className="btn btn-primary" type="submit">Log In</button>
              : <button className="btn btn-primary" type="submit">Sign Up</button> }
          </form>
        </div>
      </div>
    </>
  );
};
SignUp.propTypes = {
  registered: PropTypes.number.isRequired,
};
export default SignUp;
