import React from 'react';

export default class DiracSea extends React.Component {
    constructor() {
        super();
        console.log("DiracSea Engine loaded");

        this.renderItems = this.renderItems.bind(this);
    }    
    
    componentWillMount() {
    }

    renderItems() {
        return (
            this.props.items.map((item) => {
                return <div key={'item_' + item}>{item}</div>
            })
        );
    }

    render() {
        return (
            <div className="type-01 dirac-sea">
                DiracSea Engine
                {this.renderItems()}
            </div>
        )
    }
}