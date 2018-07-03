import React from 'react';
import { addMonths } from 'date-fns';

import Months from './MonthContainer';
import {CalendarContext} from './CalendarContext'


export default class Calendar extends React.Component {
    constructor() {
        super();
        let monthOne = new Date();
        this.state = {
            monthOne: monthOne,
            monthTwo: addMonths(monthOne, 1)
        }

        this.nextMonth = this.nextMonth.bind(this);
        this.prevMonth = this.prevMonth.bind(this);


    }

    nextMonth() {
        this.setState({
            monthOne: addMonths(this.state.monthOne, 1),
            monthTwo: addMonths(this.state.monthTwo, 1)
        })
    }

    prevMonth() {
        this.setState({
            monthOne: addMonths(this.state.monthOne, -1),
            monthTwo: addMonths(this.state.monthTwo, -1)
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.prevMonth}>prev</button>
                <button onClick={this.nextMonth}>next</button>
                <CalendarContext.Provider value={this.state}>
                    <Months />
                </CalendarContext.Provider>
            </div>
        )
    }

}