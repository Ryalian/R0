import { parse as parseQuery, stringify as stringifyQuery } from "query-string";
import { getDate, getMonth, getYear } from "date-fns";

export const changeQuery = (queryString, params) => {
    let queryParams = parseQuery(queryString) || {};

    return stringifyQuery(Object.assign({}, queryParams, params))
}

/**
 * Date related utilities
 */

let MONTH_LIST = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    .reduce((accu, curr, idx) => {
        accu[idx] = curr;
        return accu;
    }, {});

export const getFormattedDate = (timeStamp) => {
    const date = new Date(+timeStamp)
    const d = getDate(date),
        m = getMonth(date),
        y = getYear(date)

    return `${MONTH_LIST[m]} ${d}, ${y}`;
}


export const getFormattedMonth = (timeStamp) => {
    const date = new Date(+timeStamp)
    const m = getMonth(date),
        y = getYear(date)

    return `${MONTH_LIST[m]} ${y}`;
}