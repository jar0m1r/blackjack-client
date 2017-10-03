import React, { Component } from 'react';

import Card from './card';

export default class Seat extends Component {

    constructor(props){
        super(props);

        this.renderCards = this.renderCards.bind(this);
    }

    renderCards(){
        return this.props.player.hand.map( card => {
            return <Card key={ `key_${ card }` } cardname={ card } /> /* Change key to allow for future with same cards due to multiple decks */
        });
    }

    render(){
        console.log("player in seat", this.props.player.name);
        return (
            <div className="seat">
                <h3>{ this.props.player.name }</h3>
                <div className="cards">
                { this.renderCards() }
                </div>
                <div className="actions">
                    <div>Hit</div>
                    <div>Stand</div>
                </div>
            </div>
        );
    }
}