import React from 'react';

export default class ActionEngine extends React.Component {
    constructor() {
        super();

        this.renderActionList = this.renderActionList.bind(this);
    }    
    
    componentDidMount() {
        console.log("Action Engine loaded");
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