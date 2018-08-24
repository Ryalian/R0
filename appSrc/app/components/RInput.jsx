import React from 'react';

export default class RInput extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div className="RInput">
                <label>{this.props.inputLabel}</label>
                <input value={this.props.value} onChange={this.props.onChange} />
            </div>
        )
    }
}