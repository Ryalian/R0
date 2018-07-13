import React from 'react';

export default class CoreEngine extends React.Component {
    constructor() {
        super();
        this.moodsList = [
            {mood: 'HAPPY', expression: ':)'},
            {mood: 'SAD', expression: ':('},
            {mood: 'ANGRY', expression: ':)'},
            {mood: 'DUMP', expression: ':)'},
        ]
        console.log("Core Engine loaded");
    }
    
    componentWillMount() {
        console.log("Core Engine version: " + this.props.core.version);
    }

    render() {
        return (
            <div className="type-01 core-engine">
                :)
            </div>
        )
    }
}