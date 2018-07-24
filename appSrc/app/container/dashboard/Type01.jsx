import React from 'react';
import { withRouter, matchPath } from "react-router-dom";
import { connect } from 'react-redux';
import { setApp } from '../../actions';
import Apps from "../apps";

class CoreEngine extends React.Component {
    constructor() {
        super();
        this.state = {
            moods: [
                {mood: 'HAPPY', expression: ':)'},
                {mood: 'SAD', expression: ':('},
                {mood: 'ANGRY', expression: ':)'},
                {mood: 'DUMP', expression: ':)'},
            ],
            showControl: false
        }

        this.getControlClasses = this.getControlClasses.bind(this)
        this.triggerEngine = this.triggerEngine.bind(this)
        this.renderAppsSelectors = this.renderAppsSelectors.bind(this)
        this.findApp = this.findApp.bind(this)
        this.loadApp = this.loadApp.bind(this)
    }

    componentDidMount() {
        let selectedApp = this.findApp();
        this.loadApp(selectedApp, this.props.location.search);
        console.log("Core Engine version: " + this.props.core.version);
        console.log("Core Engine loaded");
    }

    componentDidUpdate() {
    }


    /*---- App Setup functions------*/
    findApp() {
        const appName = matchPath(this.props.location.pathname, {
            path: '/:app',
            exact: true,
            strict: false
        }) || { params: {app: null} };
        return Apps.find(app => app.name === appName.params.app) || Apps[0];
    }

    loadApp(app, queryString='') {
        const {setApp, history} = this.props;
        
        history.push({
            pathname: `/${app.name}`,
            search: queryString
        });
        setApp(app);
    }

    /*---- Component functions------*/
    triggerEngine() {
        this.setState({
            showControl: !this.state.showControl
        })
    }

    getControlClasses() {
        return 'core-engine-control ' + (this.state.showControl? '' : 'hidden-element');
    }

    renderAppsSelectors() {
        return Apps.map((app, idx) => 
            <button key={idx} onClick={()=>{this.loadApp(app)}}>
                {app.name}
            </button>)
    }

    render() {
        return (
            <React.Fragment>
                <div className="type-01 core-engine" onClick={this.triggerEngine}>
                    :)
                </div>

                <div className={this.getControlClasses()}>
                    {this.renderAppsSelectors()}
                </div>
            </React.Fragment>
        )
    }
}


function mapStateToProps(app, { history, location }) {
    return { app, history, location }
}

export default withRouter(connect(mapStateToProps, { setApp })(CoreEngine));