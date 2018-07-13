import React from 'react';
import { addMonths } from 'date-fns';

import Months from './MonthContainer';
import {CalendarContext} from './CalendarContext'


export default class Calendar extends React.Component {
    constructor() {
        super();
        let monthOne = new Date();

        this.nextMonth = this.nextMonth.bind(this);
        this.prevMonth = this.prevMonth.bind(this);
        this.calendarSelectDay = this.calendarSelectDay.bind(this);

        this.state = {
            monthOne: monthOne,
            monthTwo: addMonths(monthOne, 1),
            selectedDay: null,
            calendarSelectDay: this.calendarSelectDay
        }

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

    calendarSelectDay(selectedDay) {
        this.setState(
            { selectedDay: selectedDay }
        )
    }

    componentDidMount() {
        this.props.loadAction([
            <button onClick={this.prevMonth} className="rail-trigger">prev</button>,
            <button onClick={this.nextMonth} className="rail-trigger">next</button>
        ]);
        console.log('Calendar loaded!')
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