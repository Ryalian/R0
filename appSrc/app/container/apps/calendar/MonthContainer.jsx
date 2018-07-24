import React from 'react';
import {CalendarContext} from './CalendarContext';
import MonthItem from './MonthItem';

export default class MonthContainer extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <CalendarContext.Consumer>
                {(calendar) => {
                    return (
                        <div>
                            <MonthItem month={calendar.monthOne} selectedDay={calendar.selectedDay} key="1"/>
                            <MonthItem month={calendar.monthTwo} selectedDay={calendar.selectedDay} key="2"/>
                        </div>
                    )
                }}
            </CalendarContext.Consumer>
        )
    }
}