import React from 'react';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import Apps from "./apps";

class DiracSea extends React.Component {
    constructor(props) {
        super(props);
        
        this.renderRoute = this.renderRoute.bind(this)
    }    
    
    componentDidMount() {
        console.log("DiracSea Engine loaded");
    }

    componentDidUpdate() {
    }

    renderRoute() {
        const { selectedApp } = this.props;
        let App = React.Fragment,
            appRoute = '';

        if(selectedApp) {
            App = selectedApp.driver;
            appRoute = `/${selectedApp.name}`
        }

        return (
            <Switch>
                <Route 
                    path={appRoute}
                    render={(props) => selectedApp? <App loadAction={this.props.loadAction} {...props}/>: <App />}
                />
                <Redirect to={`/${Apps[0].name}`} />
            </Switch>
        )
    }

    render() {
        return (
            <div className="type-01 dirac-sea">
                {this.renderRoute()}
            </div>
        )
    }
}

function mapStateToProps({app}) {
    return { selectedApp: app }
}

export default withRouter(connect(mapStateToProps, {  })(DiracSea));