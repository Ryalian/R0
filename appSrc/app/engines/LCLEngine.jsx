import React from 'react';
import { connect } from "react-redux";

class LCLEngine extends React.Component {
    constructor() {
        super();

        //bind method
        this.renderLCL = this.renderLCL.bind(this);
    }    
    
    componentDidMount() {
        console.log("LCL Engine loaded");
    }

    componentDidUpdate() {
    }

    renderLCL() {
        // TODO: this renders everytime. may be we should rerender this base on condition
        // Not doing it yet because react is not actually rerendering
        const LCL = [<div>fetching...</div>];
        return this.props.LCL.map((lcl, idx) => (
                    <span key={'LCL_' + idx}>{lcl}</span>
                ))
    }

    render() {
        return (
            <div className="type-01 LCL-engine">
                {this.renderLCL()}
            </div>
        )
    }
}


const mapStateToProps = ({ appLCL }) => {
    return {
        LCL: appLCL.LCL
    }
}

export default connect(mapStateToProps, {})(LCLEngine)