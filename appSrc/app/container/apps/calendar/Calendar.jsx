import React from 'react';
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { addMonths } from 'date-fns';
import { appGenerator } from "../appFactory";

import Months from './MonthContainer';
import CreateEvent from './CreateEvent'; 
import {CalendarContext} from './CalendarContext'


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
            monthOne: monthOne,
            monthTwo: addMonths(monthOne, 1),
            selectedDay: null,
            calendarSelectDay: this.calendarSelectDay,
            isCreating: false,
            currentPath: ''
        };

        // init ActionsEngine items
        this.selectMonthActions = [
            <button onClick={this.prevMonth} className="rail-trigger">prev</button>,
            <button onClick={this.nextMonth} className="rail-trigger">next</button>
        ];

    }

    nextMonth() {
        this.setState({
            monthOne: addMonths(this.state.monthOne, 1),
            monthTwo: addMonths(this.state.monthTwo, 1)
        });
    }

    prevMonth() {
        this.setState({
            monthOne: addMonths(this.state.monthOne, -1),
            monthTwo: addMonths(this.state.monthTwo, -1)
        });
    }

    createEvent() {
        this.setState({
            isCreating: true
        })
    }

    calendarSelectDay(selectedDay) {
        this.setState(
            { selectedDay: selectedDay },
            () => this.loadActions()
        )
    }

    loadActions() {
        let actions = [...this.selectMonthActions];
        
        if( this.state.selectedDay ) {
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
                <CalendarContext.Provider value={this.state}>
                    {this.renderRouter()}
                </CalendarContext.Provider>
            </div>
        )
    }

}

Calendar.actions = {
    loadState: 'loadState',
    loadAction: 'loadActions'
}

export default appGenerator(Calendar);