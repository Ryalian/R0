import React from 'react';

export default class StateEngine extends React.Component {
    constructor() {
        super();
        console.log("State Engine loaded");

        //bind method
        this.renderState = this.renderState.bind(this);
    }    
    
    componentWillMount() {
    }

    renderState() {
        return (
            this.props.state.map(
                (e) => {
                    return (
                        <div key={"key_"+e} className="monument">
                            <button>{e}</button>
                        </div>)
                })
        )
    }

    render() {
        return (
            <div className="type-01 state-engine">
                {this.renderState()}
            </div>
        )
    }
}