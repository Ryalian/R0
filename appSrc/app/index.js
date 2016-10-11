import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import Header from 'Header';
import Stuff from 'Stuff';

class App extends React.Component {
    constructor() {
        super();

        this.state = {}
    }
    componentWillMount() {
        axios.get("/getSomething").then(({data}) => {
            console.log(data)
            this.setState({data: data.abc}) 
        });
    }

    render() {
        return (
            <div className="container">
                <Header />
                {this.state.data}
                <Stuff name="123"/>
            </div>
        );
    }
}

render(<App />, window.document.getElementById('app'));