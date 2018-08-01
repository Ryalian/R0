import React from 'react';
import { Link } from "react-router-dom";

export default class LCLEngine extends React.Component {
    constructor() {
        super();

        //bind method
        this.renderLCL = this.renderLCL.bind(this);
    }    
    
    componentDidMount() {
        console.log("LCL Engine loaded");
    }

    renderLCL() {
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
            <div className="type-01 LCL-engine">
                {this.renderLCL()}
            </div>
        )
    }
}