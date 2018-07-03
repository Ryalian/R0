import React from 'react';
import Calendar from '../components/calendar/Calendar';

export default class DiracSea extends React.Component {
    constructor() {
        super();
        console.log("DiracSea Engine loaded");

        // this.renderItems = this.renderItems.bind(this);
    }    
    
    componentWillMount() {
    }

    // renderItems() {
    //     return (
    //         this.props.items.map((item) => {
    //             return <ItemCard core={item} key={item}/>
    //         })
    //     );
    // }

    render() {
        return (
            <div className="type-01 dirac-sea">
                {/* {this.renderItems()} */}
                <Calendar />
            </div>
        )
    }
}