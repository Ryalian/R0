import React from 'react';
import config from './config';

import { isSameDay, isToday } from 'date-fns';

export default class DayItem extends React.Component {
    constructor(props) {
        super(props);
        
        this.getDayClass = this.getDayClass.bind(this);
        this.getStyles = this.getStyles.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    getDayClass() {
        const { date, selectedDay } = this.props;

        let selectedDayClass = isSameDay(date, selectedDay)? "calendar-selected-day": "";
        let todayClass = isToday(date)? "calenar-today": "";
        let classList = ['calendar-item', 'calendar-day', selectedDayClass, todayClass];

        return classList.join(" ");
    }

    getStyles() {
        return {
            "position": "absolute",
            "top": this.props.dayOffset.y * config.itemHeight + "%",
            "left": this.props.dayOffset.x * config.itemWidth + "%"
        }
    }

    handleClick() {
        this.props.onSelect(this.props.date, this.props.events);
    }

    render() {
        return (
            <span style={this.getStyles()}
                className={this.getDayClass()}
                onClick={this.handleClick}>
                {this.props.dateOfMonth}
                {this.props.events.map((event, idx) => (<div key={'event' + idx}>{event.title}</div>))}
            </span>
        )
    }

}