import React from 'react';
import MonthItem from './MonthItem';

export default class MonthContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { appLCL, onSelect } = this.props;

        return (
            <div>
                <MonthItem
                    month={appLCL.monthOne}
                    selectedDay={appLCL.selectedDay}
                    onSelect={onSelect}
                    />
            </div>
        )
    }
}