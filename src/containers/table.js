import React, { Component } from 'react';

import Seat from '../components/seat';

export default class Table extends Component {

    constructor(props){
        super(props);

        this.state = {
            name: props.table.name,
            seats: props.table.seats
/*             seats: [
                {
                    id: "xxxxxxx1",
                    player: {
                        id: "xxxx232",
                        name:  "Jaromir",
                        hand:  ["AH","JD"],
                        score: 0
                    },
                    dealer: false
                },
                {
                    id: "xxxxxxx2",
                    player: {
                        id: "xxxx262",
                        name:  "Myrthe",
                        hand:  ["QD","3S"],
                        score: 0
                    },
                    dealer: false
                },
                {
                    id: "xxxxxxx3",
                    player: {
                        id: "",
                        name:  "",
                        hand:  null,
                        score: 0
                    },
                    dealer: false
                }
            ] */
        }

        this.renderSeats = this.renderSeats.bind(this);
    }

    renderSeats(){
        return this.state.seats.map( seat => {
            return <Seat key={ seat.id } player={ seat.player.id !== "" ? seat.player : null} />;
        })
    }

    render(){
        return (
            <div>
                <h2>{ this.state.name }</h2>
                { this.renderSeats() }
                {/* <Seat player={ this.state.dealer } /> */}
            </div>
        );
    }
}