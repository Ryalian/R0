import React from 'react';
import MonthItem from './MonthItem';

export default class MonthContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {

    }

    render() {
        let { appLCL, onSelect } = this.props;

        return (
            <React.Fragment>
                <MonthItem
                    month={appLCL.currentMonth}
                    selectedDay={appLCL.selectedDay}
                    onSelect={onSelect}
                    {...this.props}
                    />
            </React.Fragment>
        )
    }
}