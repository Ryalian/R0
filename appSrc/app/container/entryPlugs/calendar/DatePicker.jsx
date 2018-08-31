import React from 'react';
import { startOfMonth, addMonths } from "date-fns";
import { getFormattedMonth } from "../../../util";

import MonthItem from './MonthItem';

export default class DatePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            month: startOfMonth(this.props.selectedDay)
        }

        this.handleSelect = this.handleSelect.bind(this);
        this.changeMonth = this.changeMonth.bind(this);
        
    }

    handleSelect(date) {
        this.props.onSelect(date);
    }

    changeMonth(diff) {
        this.setState({
            month: addMonths(this.state.month, diff)
        })
    }

    render() {
        return (
            <div className="calendar-date-picker">
                <div>
                    <button onClick={() => this.changeMonth(-1)}>{'<'}</button>
                    {getFormattedMonth(this.state.month)}
                    <button onClick={() => this.changeMonth(1)}>{'>'}</button>
                </div>
                <MonthItem
                    {...this.state}
                    selectedDay={this.props.selectedDay}
                    onSelect={this.handleSelect}
                    />
            </div>
        )
    }
}