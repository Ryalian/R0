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
                (action) => {
                    return (
                        <div key={'action_' + action} className="rail-coin" >
                            <button className="rail-trigger">
                                {action}
                            </button>
                        </div>
                    )
                }
            )
        );
    }

    render() {
        return (
            <div className="type-01 action-engine">
                {this.renderActionList()}
            </div>
        )
    }
}