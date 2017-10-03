import React, { Component } from 'react';

import TableListItem from './table_list_item';

export default class TableList extends Component {

    constructor(props){
        super(props);

        this.renderTableListItems = this.renderTableListItems.bind(this)
    }

    tableSelected(name){
        return () => {
            console.log("table selected:", name);
        };
    }

    renderTableListItems(){
        return this.props.tables.map(table => {
            return <TableListItem 
                key={ `key${table.Name}` } 
                name={ table.Name } 
                maxplayers={ table.maxplayers || 0 }
                numplayers={ table.numplayers || 0 }
                onSelect={ this.tableSelected(table.Name) }/>
        });
    }

    render(){
        return(
            <div className="tables">
                <h2>table list</h2>
                <ul className="tables-list">
                    { this.renderTableListItems() }
                </ul>
            </div>
        );
    }
}