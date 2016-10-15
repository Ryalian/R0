import React from 'react';

export default class DiracSea extends React.Component {
    constructor() {
        super();
        console.log("DiracSea Engine loaded")
    }    
    
    componentWillMount() {
    }

    render() {
        return (
            <div className="type-01 dirac-sea">
                DiracSea Engine {this.props.data}
            </div>
        )
    }
}