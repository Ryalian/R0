import React from 'react';
import { connect } from 'react-redux';

class ATFieldEngine extends React.Component {
    constructor() {
        super();

        this.renderActionList = this.renderActionList.bind(this);
    }    
    
    componentDidMount() {
        console.log("AT field Engine loaded");
    }

    renderActionList() {
        return this.props.ATFieldsList.map((ATFieldJSX, idx) => (
            <div key={'AT_Field_' + idx} className="rail-coin" >
                {ATFieldJSX}
            </div>
        ))
    }

    render() {
        return (
            <div className="type-01 AT-field-engine">
                {this.renderActionList()}
            </div>
        )
    }
}

const mapStateToProps = ({ appATField }) => {
    return {
        ATFieldsList: appATField.items
    }
}

export default connect(mapStateToProps, {})(ATFieldEngine)