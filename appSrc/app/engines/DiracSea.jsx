import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

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
                    render={(props) => selectedApp? <App {...this.props} {...props}/>: <App />}
                />
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

function mapStateToProps({app, appLCL}) {
    if (!app) return {selectedApp: null, appLCL: null}

    let appName = app.loadedPlug.name
    return { selectedApp: app.loadedPlug, appLCL: appLCL[appName] }
}

export default withRouter(connect(mapStateToProps, {  })(DiracSea));