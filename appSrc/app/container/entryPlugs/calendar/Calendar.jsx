import React from 'react';
import { Route, Switch } from "react-router-dom";
import { startOfMonth } from 'date-fns';

import { connect } from 'react-redux';
import { pushAppTask } from "../../../actions";
import { plugGenerator } from "../plugFactory";

// import Months from './MonthContainer';
import CalendarHome from "./CalendarHome";
import CalendarEvent from "./CalendarEvent";
import config from "./config";

class Calendar extends React.Component {
    constructor() {
        super();

        // component methods
        this.calendarSelectDay = this.calendarSelectDay.bind(this);
    }

    calendarSelectDay(selectedDay) {
        this.props.pushAppTask({
            type: 'UPDATE_APP_DATA',
            content: {
                selectedDay: selectedDay
            }
        });
    }

    componentDidMount() {
        console.log('Calendar loaded!')
    }

    render() {
        const { match } = this.props;
        
        return (
            <React.Fragment>
                <Switch>
                    <Route 
                        path={`${match.url}/configEvent`}
                        render={(props) => <CalendarEvent {...this.props}/>}
                    />
                    <Route
                        exact
                        path={`${match.url}`}
                        render={(props) => <CalendarHome {...this.props}/>}
                    />
                </Switch>
            </React.Fragment>
        )
    }

}

Calendar.initPlugData = () => {
    let currentMonth = startOfMonth(new Date());

    return {
        currentMonth: currentMonth,
        selectedDay: null
    }
}

Calendar.meta = config;


export default connect(null, { pushAppTask })(plugGenerator(Calendar));