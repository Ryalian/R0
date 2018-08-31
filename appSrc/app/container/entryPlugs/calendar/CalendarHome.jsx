import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { addMonths, isSameDay } from 'date-fns';

import LCLMonthInfo from "./LCLMonthInfo";

import { changeQuery, isEventInMonth } from "../../../util";
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
            currentPath: this.props.match.url,
            currentMonthEvent: [],
            loadedLCL: []
        }
    }

    componentDidMount() {
        axios.get('/api/calendar')
            .then(({data}) => {
                let currentMonthEvent = data.events.filter(event => {
                    return isEventInMonth(this.props.appLCL.currentMonth, event.startDate, event.endDate);
                })

                this.setState({ currentMonthEvent });
            });

        this.loadLCL();
        this.loadATFields();
    }

    componentDidUpdate() {
        this.loadLCL();
        this.loadATFields();
    }

    calendarSelectDay(selectedDay, selectedDayEvents) {
        let isCancelSelected = isSameDay(this.props.appLCL.selectedDay, selectedDay);

        this.setState({
            loadedLCL: isCancelSelected? [] 
                : selectedDayEvents.map(event => {
                    let newQuery = changeQuery(location.search, {eventId:event.id});
                    return (
                        <Link to={`${this.state.currentPath}/configEvent?${newQuery}`}>
                            <div>{event.title}</div>
                        </Link>
                    )
                })
        })
        
        this.props.pushAppTask({
            type: 'UPDATE_APP_DATA',
            content: {
                selectedDay: isCancelSelected? null :  selectedDay
            }
        });
    }

    nextMonth() {
        const {currentMonth} = this.props.appLCL;

        this.props.pushAppTask({
            type: 'UPDATE_APP_DATA',
            content: {
                currentMonth: addMonths(currentMonth, 1)
            }
        });
    }

    prevMonth() {
        const {currentMonth} = this.props.appLCL;

        this.props.pushAppTask({
            type: 'UPDATE_APP_DATA',
            content: {
                currentMonth: addMonths(currentMonth, -1)
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

            this.configEventATField = [
                <Link to={`${this.state.currentPath}/configEvent?${newQuery}`}>
                    <button className="rail-trigger">Add Event</button>
                </Link>
            ]
            ATFields = [...ATFields, ...this.configEventATField];
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
        let LCL = [<LCLMonthInfo month={this.props.appLCL.currentMonth}/>, ...this.state.loadedLCL];

        this.props.pushAppTask({
            type: 'SET_LCL',
            content: [
                ...LCL
            ]
        });
    }

    render() {
        return (
            <Months onSelect={this.calendarSelectDay} {...this.props} events={this.state.currentMonthEvent}/>
        )
    }
}