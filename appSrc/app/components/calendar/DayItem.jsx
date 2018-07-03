import React from 'react';

export default class DayItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            styles: {
                "margin": "0 10px",
                "position": "absolute",
                "width": "30px",
                "height": "20px",
                "top": this.props.offset.y * 20 + 30 + "px",
                "left": this.props.offset.x * 30 + "px",
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            styles: {
                ...this.state.styles,
                "top": nextProps.offset.y * 20 + 30 + "px",
                "left": nextProps.offset.x * 30 + "px",
            }
        })
    }

    render() {
        return (
            <span style={this.state.styles}>{this.props.some}</span>
        )
    }

}