import Calendar from "./calendar/Calendar";
import Petitgguy from "./petitgguy/Petitgguy";

/**
 * Output array of plug objects
 * PlugObject:
 *  @property {String} name Name of plug
 *  @property {Class} plug  Class for plug
 *  @property {Function} initPlugData function that returns initial data for plug
 */
export default [Calendar, Petitgguy].map(plug => {
    return {
        name: plug.meta.name,
        driver: plug,
        initPlugData: plug.initPlugData
    }
})