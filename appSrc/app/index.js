import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import CoreEngine from 'dashboard/Type01';
import StateEngine from 'dashboard/StateEngine';
import ActionEngine from 'dashboard/ActionEngine';
import DiracSea from 'DiracSea';

class App extends React.Component {
    constructor() {
        super();

        this.state = {}
    }
    componentWillMount() {
        axios.get("/getSomething").then(({data}) => {
            this.setState({data: data.abc}) 
        });
    }

    render() {
        return (
            <div className="container">
                <CoreEngine />
                <StateEngine />
                <ActionEngine />
                <DiracSea data={this.state.data} />
            </div>
        );
    }
}

render(<App />, window.document.getElementById('app'));