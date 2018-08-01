import Calendar from "./calendar/Calendar";
import Petitgguy from "./petitgguy/Petitgguy";

export default [Calendar, Petitgguy].map(plug => {
    return {
        name: plug.meta.name,
        driver: plug,
        initPlugData: plug.initPlugData
    }
})