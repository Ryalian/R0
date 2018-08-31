import React from 'react';

export default class RTextArea extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="RInput">
                <label>{this.props.inputLabel}</label>
                <textarea value={this.props.value} onChange={this.props.onChange} />
            </div>
        )
    }
}