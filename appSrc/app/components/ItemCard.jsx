import React from 'react';

export default class ItemCard extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className='electron'>
                <div className='item-core'>{this.props.core}</div>
                <div className='item-state'></div>
                <div className='item-action'></div>
                <div className='item-content'></div>
            </div>
        )
    }
}