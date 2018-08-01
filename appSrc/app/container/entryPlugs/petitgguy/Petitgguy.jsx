import React from 'react';
import { plugGenerator } from "../plugFactory";

class Petitgguy extends React.Component {
    render() {
        return (
            <div> All bears goes here </div>
        )
    }
}

Petitgguy.meta = {
    name: 'petitgguy'
}

Petitgguy.initPlugData = () => { return {}; }

export default plugGenerator(Petitgguy);