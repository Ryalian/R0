import React from 'react';

export default class ActionEngine extends React.Component {
    constructor() {
        super();
        console.log("Action Engine loaded");

        this.renderActionList = this.renderActionList.bind(this);
    }    
    
    componentWillMount() {
    }

    renderActionList() {
        return (
            this.props.actions.map(
                (action) => <button key={'action_' + action}>{action}</button>
            )
        );
    }

    render() {
        return (
            <div className="type-01 action-engine">
                Action Engine
                {this.renderActionList()}
            </div>
        )
    }
}