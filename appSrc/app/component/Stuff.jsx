import React from 'react';

export default class Stuff extends React.Component {
    constructor() {
        super();
        console.log("hahah")
    }    
    
    componentWillMount() {
       console.log("12312312");
    }

    render() {
        return (
            <p>1234</p>
            )
    }
}