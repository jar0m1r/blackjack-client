import React, { Component } from 'react';
import ReactSVG from 'react-svg'

export default class Card extends Component {

    constructor(props){
        super(props);

        this.cardClicked = this.cardClicked.bind(this);
    }

    cardClicked(){
        console.log('Clicked', this.props.cardname)
    }

    render(){
        return(
            <div onClick={ this.cardClicked }>
                <ReactSVG 
                    path={`images/cards/${ this.props.cardname }.svg`} 
                    className="card"
                />
                </div>
        );
    }
}