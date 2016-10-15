import React from 'react';

export default class CoreEngine extends React.Component {
    constructor() {
        super();
        console.log("Core Engine loaded")
    }    
    
    componentWillMount() {
    }

    render() {
        return (
            <div className="type-01 core-engine">
                Type 01
            </div>
        )
    }
}