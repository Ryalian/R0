import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import { addMonths } from 'date-fns';
import { connect } from 'react-redux';
import { pushAppTask } from "../../../actions";
import { plugGenerator } from "../plugFactory";

import Months from './MonthContainer';
import CreateEvent from './CreateEvent'; 
import {CalendarContext} from './CalendarContext';
import LCLMonthInfo from "./LCLMonthInfo";

const ENTRY_PLUG_META = {
    name: 'calendar'
}


class Calendar extends React.Component {
    constructor() {
        super();
        let monthOne = new Date();

        // component methods
        this.calendarSelectDay = this.calendarSelectDay.bind(this);
        this.loadATFields = this.loadATFields.bind(this);
        this.loadLCL = this.loadLCL.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.prevMonth = this.prevMonth.bind(this);
        this.getMonth = this.getMonth.bind(this);
        this.createEvent = this.createEvent.bind(this);
        this.renderRouter = this.renderRouter.bind(this);

        // init state
        this.state = {
            calendarSelectDay: this.calendarSelectDay,

        };

        // init ActionsEngine items
        this.selectMonthATFields = [
            <button onClick={this.prevMonth} className="rail-trigger">prev</button>,
            <button onClick={this.nextMonth} className="rail-trigger">next</button>
        ];
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

    createEvent() {
        this.setState({
            isCreating: true
        })
    }

    calendarSelectDay(selectedDay) {

        this.props.pushAppTask({
            type: 'UPDATE_APP_DATA',
            content: {
                selectedDay: selectedDay
            }
        });
    }

    loadATFields() {
        let ATFields = [],
            hasSubPate = this.props.location.pathname !== '/calendar';
        
        if(!hasSubPate) {
            ATFields = [...ATFields, ...this.selectMonthATFields];
        }

        if (this.props.appLCL.selectedDay && !hasSubPate) {
            this.createEventATField = [
                <Link to={this.state.currentPath + "/createEvent"}>
                    <button onClick={this.createEvent} className="rail-trigger">Add Event</button>
                </Link>
            ]
            ATFields = [...ATFields, ...this.createEventATField];
        }

        this.props.pushAppTask({
            type: 'UPDATE_APP_ACTION',
            content: [...ATFields].map(atfield => {
                return {
                    plugName: ENTRY_PLUG_META.name,
                    content: atfield
                }
            })
        });
    }

    getMonth() {
        return this.props.appLCL.monthOne.toString();
    }

    loadLCL() {
        this.props.pushAppTask({
            type: 'SET_LCL',
            content: [
                <LCLMonthInfo month={this.props.appLCL.monthOne}/>
            ]
        });
    }

    renderCreateEvent(props) {
        return (
            <CreateEvent date={this.state.selectedDay} onSubmit={()=> this.setState({isCreating: false})} {...props} />
        )
    }

    renderRouter() {
        return (
            <Switch>
            <Route path={this.state.currentPath + "/"} exact render={(props) => <Months {...props}/>} />
            <Route path={this.state.currentPath + "/createEvent"} render={(props) => this.renderCreateEvent(props)} />
        </Switch>
        )
    }

    componentDidMount() {
        this.setState({ currentPath: this.props.match.url });
        this.loadATFields();
        this.loadLCL();

        console.log('Calendar loaded!')
    }

    componentDidUpdate() {
        this.loadATFields();
        this.loadLCL();
    }

    render() {
        return (
            <div>
                <CalendarContext.Provider value={{...this.state, ...this.props.appLCL}}>
                    {this.renderRouter()}
                </CalendarContext.Provider>
            </div>
        )
    }

}

Calendar.initPlugData = () => {
    let monthOne = new Date()

    return {
        monthOne: monthOne,
        monthTwo: addMonths(monthOne, 1),
        selectedDay: null,
        isCreating: false,
        currentPath: ''
    }
}

Calendar.meta = ENTRY_PLUG_META;


export default connect(null, { pushAppTask })(plugGenerator(Calendar));