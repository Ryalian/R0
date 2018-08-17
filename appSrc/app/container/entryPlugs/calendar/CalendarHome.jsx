import React from "react";
import { Link } from "react-router-dom";
import { addMonths, isThisSecond } from 'date-fns';

import LCLMonthInfo from "./LCLMonthInfo";

import { changeQuery } from "../../../util";
import Months from './MonthContainer';
import config from "./config";

export default class CalendarHome extends React.Component {
    constructor(props) {
        super(props);

        this.calendarSelectDay = this.calendarSelectDay.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.prevMonth = this.prevMonth.bind(this);
        this.loadATFields = this.loadATFields.bind(this);
        this.loadLCL = this.loadLCL.bind(this);

        // init ActionsEngine items
        this.selectMonthATFields = [
            <button onClick={this.prevMonth} className="rail-trigger">{'<'}</button>,
            <button onClick={this.nextMonth} className="rail-trigger">{'>'}</button>
        ];

        this.state ={
            currentPath: this.props.match.url
        }
    }

    componentDidMount() {
        this.loadLCL();
        this.loadATFields();
    }

    componentDidUpdate() {
        this.loadLCL();
        this.loadATFields();
    }

    calendarSelectDay(selectedDay) {
        this.props.pushAppTask({
            type: 'UPDATE_APP_DATA',
            content: {
                selectedDay: selectedDay
            }
        });
    }

    nextMonth() {
        const {monthOne, monthTwo} = this.props.appLCL;

        this.props.pushAppTask({
            type: 'UPDATE_APP_DATA',
            content: {
                monthOne: addMonths(monthOne, 1),
                monthTwo: addMonths(monthTwo, 1)
            }
        });
    }

    prevMonth() {
        const {monthOne, monthTwo} = this.props.appLCL;

        this.props.pushAppTask({
            type: 'UPDATE_APP_DATA',
            content: {
                monthOne: addMonths(monthOne, -1),
                monthTwo: addMonths(monthTwo, -1)
            }
        })
    }

    loadATFields() {
        let ATFields = [],
            hasSubPate = this.props.location.pathname !== '/calendar';
        
        if(!hasSubPate) {
            ATFields = [...ATFields, ...this.selectMonthATFields];
        }

        if (this.props.appLCL.selectedDay && !hasSubPate) {
            const {location, appLCL} = this.props;
            let newQuery = changeQuery(location.search, {startDate: appLCL.selectedDay.getTime()});

            this.createEventATField = [
                <Link to={`${this.state.currentPath}/createEvent?${newQuery}`}>
                    <button className="rail-trigger">Add Event</button>
                </Link>
            ]
            ATFields = [...ATFields, ...this.createEventATField];
        }

        this.props.pushAppTask({
            type: 'UPDATE_APP_ACTION',
            content: [...ATFields].map(atfield => {
                return {
                    plugName: config.name,
                    content: atfield
                }
            })
        });
    }

    loadLCL() {
        this.props.pushAppTask({
            type: 'SET_LCL',
            content: [
                <LCLMonthInfo month={this.props.appLCL.monthOne}/>
            ]
        });
    }

    render() {
        return (
            <Months onSelect={this.calendarSelectDay} {...this.props}/>
        )
    }
}