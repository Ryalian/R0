import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { BrowserRouter } from "react-router-dom";
import axios from 'axios';

import CoreEngine from './engines/Type01';
import LCLEngine from './engines/LCLEngine';
import ATFieldEngine from './engines/ATFieldEngine';
import DiracSea from './engines/DiracSea';

// import reducers
import reducers from './reducers';
const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(reduxThunk)
);

class App extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        axios.get("/getS2Engines").then(({data}) => {
            let S2List = data.S2Kikan;
            // TODO: make the following more deterministic
            delete S2List[0].actions;
            // load data onto machine
            this.setState(S2List[0]); 
        });
        axios.get('/api/calendar');
    }

    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <CoreEngine/>
                    <LCLEngine/>
                    <ATFieldEngine/>
                    <DiracSea/>
                </div>
            </BrowserRouter>
        );
    }
}

render(
    <Provider store={store}>
        <App />
    </Provider>
    , window.document.getElementById('app'));