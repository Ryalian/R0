import React from 'react';

export default class CalendarHeader extends React.Component {
    constructor() {
        super();

        this.DaysOfWeek = [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
        ]
    }

    render() {
        return (
            <div>
                {this.DaysOfWeek.map((day) => (<span key={day}>{day}</span>))}
            </div>
        )
    }

}