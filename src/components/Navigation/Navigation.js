import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';
import { GetPriceWithSpaces } from '../../shared/utility'
import * as actions from "../../store/actions";

export default function SimpleTabs() {

    const [toggleButtonClass, setToggleButtonClass] = useState(['collapse','navbar-collapse']);

    const trader = useSelector(state => {
        return state.trader;
    });

    const toggleButtonClassJoin = () => {
        return toggleButtonClass.join(" ");
    }

    const showMobileItems = () => {
        if ( toggleButtonClass.length === 2 ) {
            setToggleButtonClass([...toggleButtonClass, "show"])
        } else {
            setToggleButtonClass([...toggleButtonClass].splice(0,2))
        }
    };

    const dispatch = useDispatch()

    const endPeriod = (period) => {
        dispatch(actions.endPeriod(period))
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <span className="navbar-brand">Real Estate</span>
            <button onClick={showMobileItems} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02"
                    aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={toggleButtonClassJoin()} id="navbarColor02">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            exact
                            to="/">Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            to="/market">Market
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            to="/my-flats">My flats
                        </NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <span className="nav-link">My age: { Math.floor(trader.age) } <span className="sr-only">(current)</span></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link">currency: { GetPriceWithSpaces(trader.fortune) }</span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link">work: {trader.period} months</span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link">skip:</span>
                    </li>
                    <li className="nav-item">
                        <span onClick={() => endPeriod(1)} className="nav-link">month</span>
                    </li>
                    <li className="nav-item">
                        <span onClick={() => endPeriod(12)}  className="nav-link" >year</span>
                    </li>
                    <li className="nav-item">
                        <span onClick={() => endPeriod(120)}  className="nav-link" >decade</span>
                    </li>
                </ul>
            </div>
        </nav>
    );
}