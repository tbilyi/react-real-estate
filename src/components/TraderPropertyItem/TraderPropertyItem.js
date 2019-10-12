import React from 'react';
import '../MarketFlatItem/MarketFlatItem.css'
import { NavLink } from "react-router-dom";
import {useSelector} from "react-redux";

const TraderPropertyItem = (props) =>  {

    const apartmentCondition = useSelector( state => state.todos.apartmentCondition );
    const neighbourhood = useSelector( state => state.todos.neighbourhood );

    return (
        <React.Fragment>
            <tr className="table-active">
                <th scope="row">
                    <NavLink to={`/my-flats/flat/${props.id}`}>
                        {props.location}
                    </NavLink>
                </th>
                <td>{neighbourhood(props.district)}</td>
                <td>{apartmentCondition(props.condition)}</td>
                <td>{props.rented ? "+" : "-"}</td>
            </tr>
        </React.Fragment>
    )
};

export default TraderPropertyItem