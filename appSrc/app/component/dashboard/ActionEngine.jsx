import React from 'react';

export default class ActionEngine extends React.Component {
    constructor() {
        super();
        console.log("Action Engine loaded")
    }    
    
    componentWillMount() {
    }

    render() {
        return (
            <div className="type-01 action-engine">
                Action Engine
            </div>
        )
    }
}