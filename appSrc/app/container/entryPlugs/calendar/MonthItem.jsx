import React from 'react';
import { startOfMonth, lastDayOfMonth,addDays, getDate, getDay,getMonth, getYear } from 'date-fns';

import { isEventInDay } from "../../../util";
import DayItem from './DayItem';
import CalendarHeader from './CalendarHeader';

const styles = {
    "position": "relative",
    "display": "inline-block"
}

export default class MonthItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleSelectDay = this.handleSelectDay.bind(this)
    }

    handleSelectDay(date, events) {
        this.props.onSelect(date, events);
    }

    renderDays() {
        let days =[],
            selectedMonth = this.props.month,
            startDayOfMonth = startOfMonth(selectedMonth),
            endDayOfMonth = lastDayOfMonth(selectedMonth),
            pivot = new Date(startDayOfMonth.getTime()),
            timer = 0,
            events = this.props.events || [];// TODO, this should be implemented with redux

        while(pivot.getTime() <= endDayOfMonth.getTime() && timer < 31) {
            days.push(pivot);
            pivot = addDays(pivot, 1);
            timer++;
        }

        let offsets = getDay(startDayOfMonth);

        return days.map((day, idx) => {
            
            let dateOfMonth = getDate(day),
                eventsInDay = events.filter(event => isEventInDay(day, event.startDate, event.endDate));

            let dayProps = {
                dayOffset: {
                    x: (dateOfMonth + offsets - 1) % 7,
                    y: ((dateOfMonth + offsets - 1) / 7) >> 0
                },
                date: day,
                selectedDay: this.props.selectedDay,
                dateOfMonth,
                events: eventsInDay
            }

            return (
                <DayItem
                    {...dayProps}
                    onSelect={this.handleSelectDay}
                    key={'day_' + idx}
                    />
            )
        })
    }

    render() {
        return (
            <div style={styles} className="calendar-month">
                <CalendarHeader />
                <div className="calendar-body">
                    {this.renderDays()}
                </div>
            </div>
        )
    }

}