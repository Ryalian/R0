import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import { addMonths } from 'date-fns';
import { connect } from 'react-redux';
import { pushAppTask } from "../../../actions";
import { appGenerator } from "../appFactory";

import Months from './MonthContainer';
import CreateEvent from './CreateEvent'; 
import {CalendarContext} from './CalendarContext';




class Calendar extends React.Component {
    constructor() {
        super();
        let monthOne = new Date();

        // component methods
        this.calendarSelectDay = this.calendarSelectDay.bind(this);
        this.loadActions = this.loadActions.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.prevMonth = this.prevMonth.bind(this);
        this.createEvent = this.createEvent.bind(this);
        this.renderRouter = this.renderRouter.bind(this);

        // init state
        this.state = {
            // monthOne: monthOne,
            // monthTwo: addMonths(monthOne, 1),
            // selectedDay: null,
            // calendarSelectDay: this.calendarSelectDay,
            // isCreating: false,
            // currentPath: ''
            calendarSelectDay: this.calendarSelectDay,

        };

        // init ActionsEngine items
        this.selectMonthActions = [
            <button onClick={this.prevMonth} className="rail-trigger">prev</button>,
            <button onClick={this.nextMonth} className="rail-trigger">next</button>
        ];

    }

    nextMonth() {
        const {monthOne, monthTwo} = this.props.appState;

        this.props.pushAppTask({
            type: 'UPDATE_APP_DATA',
            content: {
                monthOne: addMonths(monthOne, 1),
                monthTwo: addMonths(monthTwo, 1)
            }
        })
    }

    prevMonth() {
        const {monthOne, monthTwo} = this.props.appState;

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

    loadActions() {
        let actions = [...this.selectMonthActions];
        
        if( this.props.appState.selectedDay ) {
            actions.push(
                <Link to={this.state.currentPath + "/createEvent"}>
                    <button onClick={this.createEvent} className="rail-trigger">Add Event</button>
                </Link>
            )
        }

        this.props.loadAction(actions);
    }

    renderCreateEvent(props) {
        return (
            <CreateEvent date={this.state.selectedDay} onSubmit={()=> this.setState({isCreating: false})} {...props} />
        )
    }

    componentDidMount() {
        this.setState({
            currentPath: this.props.match.url
        }, this.loadActions);

        console.log('Calendar loaded!')
    }

    componentDidUpdate() {
        if(this.props.appState.selectedDay) {
            this.loadActions();
        }
    }
    

    renderRouter() {
        return (
            <Switch>
            <Route path={this.state.currentPath + "/"} exact render={(props) => <Months {...props}/>} />
            <Route path={this.state.currentPath + "/createEvent"} render={(props) => this.renderCreateEvent(props)} />
        </Switch>
        )
    }

    render() {
        return (
            <div>
                <CalendarContext.Provider value={{...this.state, ...this.props.appState}}>
                    {this.renderRouter()}
                </CalendarContext.Provider>
            </div>
        )
    }

}

Calendar.initState = () => {
    let monthOne = new Date()

    return {
        monthOne: monthOne,
        monthTwo: addMonths(monthOne, 1),
        selectedDay: null,
        isCreating: false,
        currentPath: ''
    }
}

Calendar.meta = {
    name: 'calendar'
}


export default connect(null, { pushAppTask })(appGenerator(Calendar));