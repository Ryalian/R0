import React from 'react';
import { Link } from "react-router-dom";

export default class StateEngine extends React.Component {
    constructor() {
        super();

        //bind method
        this.renderState = this.renderState.bind(this);
    }    
    
    componentDidMount() {
        console.log("State Engine loaded");
    }

    shouldComponentUpdate(nextProps) {
        return this.props.state !== nextProps.state;
    }

    renderState() {
        return (
            <React.Fragment>
                <div key={"key_1"} className="monument">
                    <Link to="/calendar"><button>calendar</button></Link>
                </div>
                <div key={"key_2"} className="monument">
                    <Link to="/some"><button>some</button></Link>
                </div>
            </React.Fragment>
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