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
                {(months) => {
                    return (
                        <div>
                            <MonthItem month={months.monthOne}/>
                            <MonthItem month={months.monthTwo}/>
                        </div>
                    )
                }}
            </CalendarContext.Consumer>
        )
    }
}