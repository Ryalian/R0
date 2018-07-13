import React from 'react';

export default class ActionEngine extends React.Component {
    constructor() {
        super();
        console.log("Action Engine loaded");

        this.renderActionList = this.renderActionList.bind(this);
    }    
    
    componentWillReceiveProps(nextProps) {
    }

    renderActionList() {
        return this.props.actions.map((actionJSX, idx) => (
            <div key={'action_' + idx} className="rail-coin" >
                {actionJSX}
            </div>
        ))
    }

    render() {
        return (
            <div className="type-01 action-engine">
                {this.renderActionList()}
            </div>
        )
    }
}