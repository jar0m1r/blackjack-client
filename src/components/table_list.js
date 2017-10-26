import React, { Component } from 'react';

import TableListItem from './table_list_item';

export default class TableList extends Component {

    constructor(props){
        super(props);

        this.renderTableListItems = this.renderTableListItems.bind(this);
        this.tableSelected = this.tableSelected.bind(this);
    }

    tableSelected(id){
        return () => {
            console.log("table selected:", id);
            this.props.onSelect(id);
        };
    }

    renderTableListItems(){
        return this.props.tables.map(table => {
            console.log("table list item created with id", table.id)
            return <TableListItem 
                key={ `key${table.id}` } 
                name={ table.name } 
                numseats={ table.numseats || 0 }
                onSelect={ this.tableSelected(table.id) }/>
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