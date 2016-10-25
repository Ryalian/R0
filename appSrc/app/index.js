import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import CoreEngine from 'dashboard/Type01';
import StateEngine from 'dashboard/StateEngine';
import ActionEngine from 'dashboard/ActionEngine';
import DiracSea from 'DiracSea';

// import Core Mechanic
import Core from 'core/coreFunc';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            core: Core,
            actions: [],
            state: [],
            items: []
        }

        console.log(this.state.core);
    }
    componentWillMount() {
        axios.get("/getS2Engines").then(({data}) => {
            let S2List = data.S2Kikan;
            console.log(data.S2Kikan);
            // load data onto machine
            this.setState(S2List[0]); 
        });
    }

    render() {
        return (
            <div className="container">
                <CoreEngine core={this.state.core}/>
                <StateEngine state={this.state.state}/>
                <ActionEngine actions={this.state.actions}/>
                <DiracSea items={this.state.items} />
            </div>
        );
    }
}

render(<App />, window.document.getElementById('app'));