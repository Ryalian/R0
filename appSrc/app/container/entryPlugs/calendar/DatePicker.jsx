import React from 'react';
import { startOfMonth } from "date-fns";

import MonthItem from './MonthItem';

export default class DatePicker extends React.Component {
    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            month: startOfMonth(this.props.selectedDay)
        }
    }

    handleSelect(date) {
        this.props.onSelect(date);
    }

    render() {
        return (
            <div>
                <MonthItem
                    {...this.state}
                    selectedDay={this.props.selectedDay}
                    onSelect={this.handleSelect}
                    />
            </div>
        )
    }
}