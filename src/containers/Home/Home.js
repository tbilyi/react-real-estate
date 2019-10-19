import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetPriceWithSpaces } from '../../shared/utility/prices';
import SignUp from '../../components/Auth/SignUp/SignUp';
import * as actions from '../../store/actions';

const Home = () => {
  const trader = useSelector((state) => state.trader);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const [registered, setRegistered] = useState(0);
  const [period, setPeriod] = useState(1);
  const dispatch = useDispatch();
  const endPeriod = (val) => dispatch(actions.endPeriod(val));
  const saveData = () => dispatch(actions.saveData(trader, token, userId));
  const handleChange = (event) => {
    setPeriod(+event.currentTarget.value);
  };
  useMemo(() => {
    if (userId) setRegistered(3);
  }, [userId]);

  return (
    <>
      { registered === 1 || registered === 2 ? (
        <SignUp registered={registered} />
      ) : registered === 3 ? (
        <div className="card">
          <div className="card-header">
              Params
          </div>
          <div className="card-body">
            <p>{`number of flats: ${trader.flats.length}`}</p>
            <p>{`currency: ${GetPriceWithSpaces(trader.fortune)}$`}</p>
            <p>{`income: ${GetPriceWithSpaces(trader.income)}$`}</p>
            <div className="form-row">
              <div className="col-auto my-1">
                <h6>skip period to get income for rent</h6>
                <select className="custom-select custom-select-sm" onChange={handleChange}>
                  <option value="1">{`Day ( +${GetPriceWithSpaces(trader.income)}$ )`}</option>
                  <option value="7">{`Week ( +${GetPriceWithSpaces(trader.income * 7)}$ )`}</option>
                  <option value="30">{`Month ( +${GetPriceWithSpaces(trader.income * 30)}$ )`}</option>
                  <option value="365">{`Year ( +${GetPriceWithSpaces(trader.income * 365)}$ )`}</option>
                </select>
                <div>
                  <button
                    style={{ marginTop: '5px' }}
                    className="btn btn-success"
                    type="button"
                    onClick={() => endPeriod(period)}
                  >
                    Skip Period
                  </button>
                </div>
                <div>
                  <button
                    style={{ marginTop: '5px' }}
                    className="btn btn-info"
                    type="button"
                    onClick={() => saveData()}
                  >
                    Save your data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <h2>You are not authorised, please log in:</h2>
            <button className="btn btn-primary" type="submit" onClick={() => setRegistered(1)}>Log In</button>
            <h2>Or create new account:</h2>
            <button className="btn btn-primary" type="submit" onClick={() => setRegistered(2)}>Sign Up</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
