import React, { Component } from 'react';

export default class TableListItem extends Component {

    constructor(props){
        super(props);

        this.tableSelected = this.tableSelected.bind(this);
    }

    tableSelected(){
        this.props.onSelect();
    }

    render(){
        return(
            <li onClick={ this.tableSelected }>{ this.props.name } { this.props.numseats }</li>
        );
    }
}