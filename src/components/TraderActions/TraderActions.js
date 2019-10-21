import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetPriceWithSpaces } from '../../shared/utility';
import * as actions from '../../store/actions';

const TraderActions = () => {
  const trader = useSelector((state) => state.trader);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const [period, setPeriod] = useState(1);
  const handleChange = (event) => {
    setPeriod(+event.currentTarget.value);
  };
  const endPeriod = (val) => dispatch(actions.endPeriod(val));
  const saveData = () => dispatch(actions.saveData(trader, token, userId));
  return (
    <div className="card">
      <div className="card-header">
        Params
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <p>{`number of flats: ${trader.flats.length}`}</p>
            <p>{`currency: ${GetPriceWithSpaces(trader.fortune)}$`}</p>
            <p>{`income: ${GetPriceWithSpaces(trader.income)}$`}</p>
            <div>
              <button
                style={{ marginTop: '5px' }}
                className="btn btn-danger"
                type="button"
                onClick={() => saveData()}
              >
                Save your data
              </button>
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraderActions;
