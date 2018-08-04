import React from "react";
import { getMonth, getYear } from "date-fns";

export default (props) => {
    let monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                .reduce((accu, curr, idx) => {
                    accu[idx] = curr;
                    return accu;
                }, {});
    let currentDay = props.month,
        currentMonth = getMonth(currentDay);
    
    return (<div>{monthList[currentMonth]} {getYear(currentDay)}</div>)
}