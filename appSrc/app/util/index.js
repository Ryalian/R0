import { parse as parseQuery, stringify as stringifyQuery } from "query-string";

export const changeQuery = (queryString, params) => {
    let queryParams = parseQuery(queryString) || {};

    return stringifyQuery(Object.assign({}, queryParams, params))
}