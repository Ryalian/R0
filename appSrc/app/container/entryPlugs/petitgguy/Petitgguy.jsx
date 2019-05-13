import React from 'react';
import { plugGenerator } from "../plugFactory";

import RippleGrid from "./RippleGrid";

class Petitgguy extends React.Component {
    render() {
        return (
            <div> 
                <RippleGrid />
            </div>
        )
    }
}

Petitgguy.meta = {
    name: 'petitgguy'
}

Petitgguy.initPlugData = () => { return {}; }

export default plugGenerator(Petitgguy);