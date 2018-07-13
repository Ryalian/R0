import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import CoreEngine from 'container/dashboard/Type01';
import StateEngine from 'container/dashboard/StateEngine';
import ActionEngine from 'container/dashboard/ActionEngine';
import DiracSea from 'container/DiracSea';

// import Core Mechanic
import Core from 'container/core/coreFunc';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            core: Core,
            actions: [],
            state: [],
            items: []
        }

        this.loadActions = this.loadActions.bind(this)
    }
    componentDidMount() {
        axios.get("/getS2Engines").then(({data}) => {
            let S2List = data.S2Kikan;
            // TODO: make the following more deterministic
            delete S2List[0].actions;
            // load data onto machine
            this.setState(S2List[0]); 
        });
    }

    loadActions(actions) {
        this.setState({
            actions: actions
        })
    }

    render() {
        return (
            <div className="container">
                <CoreEngine core={this.state.core}/>
                <StateEngine state={this.state.state}/>
                <ActionEngine actions={this.state.actions}/>
                <DiracSea items={this.state.items} loadAction={this.loadActions}/>
            </div>
        );
    }
}

render(<App />, window.document.getElementById('app'));