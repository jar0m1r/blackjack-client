import React, { Component } from 'react';

export default class TableCreate extends Component {

    constructor(props){
        super(props);

        this.state = {
            name: '',
            maxplayers: 1
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(this.state);
        this.props.onTableCreate(this.state);
    }

    handleChange(event){
        this.setState({[event.target.name]:event.target.value});
    }

    render(){
        return (
            <div className="tables">
                <h2>Create New Table</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="name">table name</label>
                        <input type="text" value={ this.state.name } id="name" name="name" onChange={ this.handleChange } placeholder="table name..." />
                    </div>
                    <div>
                        <label htmlFor="maxplayers">number of players</label>
                        <select value={ this.state.maxplayers } id="maxplayers" name="maxplayers" onChange={ this.handleChange }>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                    <div>
                        <input type="submit" value="Create" />
                    </div>
              </form>
            </div>
        );
    }
}