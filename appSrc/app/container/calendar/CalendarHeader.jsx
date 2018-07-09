import React from 'react';
import HeaderDay from './CalendarHeaderDay';

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

    renderDays(days) {
        return days.map((day) => (<HeaderDay key={day} day={day}/>));
    }

    render() {
        return (
            <div>
                {this.renderDays(this.DaysOfWeek)}
            </div>
        )
    }

}