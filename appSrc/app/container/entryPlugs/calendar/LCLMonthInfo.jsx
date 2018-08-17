import React from "react";

import { getFormattedMonth } from "../../../util";

export default (props) => {
    return (<div>{getFormattedMonth(props.month)}</div>)
}