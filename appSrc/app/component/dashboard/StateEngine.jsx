import React from 'react';

export default class StateEngine extends React.Component {
    constructor() {
        super();
        console.log("State Engine loaded")
    }    
    
    componentWillMount() {
    }

    render() {
        return (
            <div className="type-01 state-engine">
                State Engine
            </div>
        )
    }
}