import Calendar from "./calendar/Calendar";
import Petitgguy from "./petitgguy/Petitgguy";

export default [
    {name: Calendar.meta.name, driver: Calendar, initState: Calendar.initState},
    {name: Petitgguy.meta.name, driver: Petitgguy, initState: Calendar.initState},
]