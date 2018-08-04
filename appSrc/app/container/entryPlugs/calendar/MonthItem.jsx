import React from 'react';
import DayItem from './DayItem';
import CalendarHeader from './CalendarHeader';
import { CalendarContext } from './CalendarContext';
import { startOfMonth, lastDayOfMonth,addDays, getDate, getDay,getMonth, getYear } from 'date-fns';

const styles = {
    "position": "relative",
    "display": "inline-block"
}

export default class MonthItem extends React.Component {
    constructor(props) {
        super(props);

    }
    

    renderDays() {
        let days =[],
            selectedMonth = this.props.month,
            startDayOfMonth = startOfMonth(selectedMonth),
            endDayOfMonth = lastDayOfMonth(selectedMonth),
            pivot = new Date(startDayOfMonth.getTime()),
            timer = 0;

        while(pivot.getTime() <= endDayOfMonth.getTime() && timer < 31) {
            days.push(pivot);
            pivot = addDays(pivot, 1);
            timer++;
        }

        let offsets = getDay(startDayOfMonth);

        return days.map((day, index) => {
                let dateOfMonth = getDate(day);

                let props = {
                    dayOffset: {
                        x: (dateOfMonth + offsets - 1) % 7,
                        y: ((dateOfMonth + offsets - 1) / 7) >> 0
                    },
                    date: day,
                    dateOfMonth
                }

                return (
                    <CalendarContext.Consumer key={index}>
                        { calendar => (<DayItem {...props} {...calendar}/>) }
                    </CalendarContext.Consumer>
                )
            }
        )
    }

    render() {
        return (
            <div style={styles} className="calendar-month">
                <CalendarHeader />
                <div className="calendar-body">{this.renderDays()}</div>
            </div>
        )
    }

}