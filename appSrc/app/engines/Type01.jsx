import React from 'react';
import { withRouter, matchPath } from "react-router-dom";
import { connect } from 'react-redux';
import { loadedPlug, setLCLState, processAppTask, clearAppTask } from '../actions';
import EntryPlugs from "../container/entryPlugs";

class CoreEngine extends React.Component {
    constructor() {
        super();
        // TODO: use a class for following model
        this.state = {
            moods: [
                {mood: 'HAPPY', expression: ':)'},
                {mood: 'SAD', expression: ':('},
                {mood: 'ANGRY', expression: ':/'},
                {mood: 'DUMP', expression: ':l'},
            ],
            selectedMood: 0,
            showControl: false,
            version: 'Type 01'
        }

        this.renderPlugsSelectors = this.renderPlugsSelectors.bind(this)
        this.getControlClasses = this.getControlClasses.bind(this)
        this.triggerEngine = this.triggerEngine.bind(this)
        this.findPlug = this.findPlug.bind(this)
        this.loadPlug = this.loadPlug.bind(this)
    }

    // Life cycle
    componentDidMount() {
        let selectedPlug = this.findPlug(),
            { location } = this.props;

        this.loadPlug(selectedPlug, location.search, location.pathname);

        console.log("Core Engine version: " + this.state.version);
        console.log("Core Engine loaded");
    }

    componentDidUpdate() {
        let appTasks = this.props.tasksList;

        if(appTasks.length) {
            appTasks.forEach(task => this.props.processAppTask({
                ...task,
                target: this.props.plug.name
            }))

            //TODO: make the following more meaningful
            this.setState({
                selectedMood: (this.state.selectedMood + 1) % this.state.moods.length
            });

            this.props.clearAppTask()
        }
    }


    /**
     * Find plug with name get from route
     * 
     * return {Object} plug object. If no plug found, return default plug at slot 0.
     */
    findPlug() {
        const selectedPlugName = matchPath(this.props.location.pathname, {
            path: '/:plug',
            exact: true,
            strict: false
        }) || { params: {plug: null} };
        
        return EntryPlugs.find(
                entryPlug => entryPlug.name === selectedPlugName.params.plug
            ) || EntryPlugs[0];
    }

    /**
     * Load selected plug into redux store
     * 
     * @param {Object} plug Selected plug
     * @param {String} queryString query string for url setup
     */
    loadPlug(plug, queryString='', pathname=null) {
        const { loadedPlug, setLCLState, history, location } = this.props;
        console.log(plug)
        
        history.push({
            pathname: pathname !== '/' ? pathname : `/${plug.name}`,
            search: queryString
        });
        loadedPlug(plug);
        setLCLState({ name: plug.name, initData: plug.initPlugData() })
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

    renderPlugsSelectors() {
        return EntryPlugs.map((plug, idx) => 
            <button key={idx} onClick={()=>{this.loadPlug(plug)}}>
                {plug.name}
            </button>)
    }

    render() {
        const { moods, selectedMood } = this.state;

        return (
            <React.Fragment>
                <div className="type-01 core-engine" onClick={this.triggerEngine}>
                    { moods[selectedMood].expression }
                </div>

                <div className={this.getControlClasses()}>
                    {this.renderPlugsSelectors()}
                </div>
            </React.Fragment>
        )
    }
}

function mapStateToProps({app}, { history, location }) {
    return {
        plug: app.loadedPlug,
        tasksList: app.tasksList,
        history,
        location
    }
}

export default withRouter(connect(mapStateToProps, { loadedPlug, setLCLState, processAppTask, clearAppTask })(CoreEngine));