import React, { Component } from 'react';

import Seat from '../components/seat';

export default class Table extends Component {

    constructor(props){
        super(props);

        this.state = {
            name: props.name,
            players: [
                {
                    id: "xxxxxxx1",
                    name:  "Jaromir",
                    hand:  ["AH","JD"],
                    score: 0
                },
                {
                    id: "xxxxxxx2",
                    name:  "Myrthe",
                    hand:  ["5D","QH"],
                    score: 0
                }
            ],
            dealer: {
                name: "Dealer",
                hand: ["10S", "2H"],
                score: 0
            }
        }

        this.renderSeats = this.renderSeats.bind(this);
    }

    renderSeats(){
        return this.state.players.map( player => {
            return <Seat key={ player.id } player={ player } />;
        })
    }

    render(){
        return (
            <div>
                <h2>Table</h2>
                { this.renderSeats() }
                <Seat player={ this.state.dealer } />
            </div>
        );
    }
}