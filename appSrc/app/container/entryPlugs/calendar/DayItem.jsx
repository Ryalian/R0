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

    componentWillReceiveProps() {
    }

    getDayClass() {
        let selectedDayClass = isSameDay(this.props.date, this.props.selectedDay)? "calendar-selected-day": "";
        let todayClass = isToday(this.props.date)? "calenar-today": "";
        let classList = ['calendar-item', 'calendar-day', selectedDayClass, todayClass];

        return classList.join(" ");
    }

    getStyles() {
        return {
            "position": "absolute",
            "top": this.props.dayOffset.y * config.itemHeight + "px",
            "left": this.props.dayOffset.x * config.itemWidth + "px"
        }
    }

    handleClick() {
        this.props.calendarSelectDay(this.props.date);
    }

    render() {
        return (
            <span style={this.getStyles()}
                className={this.getDayClass()}
                onClick={this.handleClick}>
                {this.props.dateOfMonth}
            </span>
        )
    }

}