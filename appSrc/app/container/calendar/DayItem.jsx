import React from 'react';
import config from './config';

export default class DayItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            styles: {
                "position": "absolute",
                "top": this.props.dayOffset.y * config.itemHeight + "px",
                "left": this.props.dayOffset.x * config.itemWidth + "px",
            }
        }

        this.handleClick = this.handleClick.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            styles: {
                ...this.state.styles,
                "top": nextProps.dayOffset.y * config.itemHeight + "px",
                "left": nextProps.dayOffset.x * config.itemWidth + "px",
            }
        })
    }

    handleClick() {
        console.log(this.props.date)
    }

    render() {
        return (
            <span style={this.state.styles}
                className="calendar-item"
                onClick={this.handleClick}>
                {this.props.dateOfMonth}
            </span>
        )
    }

}