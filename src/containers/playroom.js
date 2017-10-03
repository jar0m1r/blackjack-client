import React, { Component } from 'react';

import Player from '../components/player';
import TableList from '../components/table_list';
import TableCreate from '../components/table_create';
import Table from './table';

import MessageUtil from '../utils/message_utils';

export default class extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playername: null,
            //tables: [{ name: "blackjack1", numplayers: 2, maxplayers: 3 }, { name: "blackjack2", numplayers: 2, maxplayers: 2 }, { name: "blackjack3", numplayers: 1, maxplayers: 3 }],
            tables: [],
            wsconn: null
        }

        this.setName = this.setName.bind(this)
        this.createTable = this.createTable.bind(this)
        this.connectToPlayroom = this.connectToPlayroom.bind(this)
    }

    componentDidMount(){

    }

    createTable(table){
        console.log("Table created to be send", table);
        table.numplayers = 0;

        if(this.state.wsconn == null){
            console.log("no connection to send new table")
            return
        }

        console.log("Sending new table via connection");
        const message = {
            Messagetype : "table",
            Payload : {
                Name : table.name
            }
        }
        this.state.wsconn.send(JSON.stringify(message));
    }

    setName(name){
        console.log("name:", name)
        this.setState({ playername: name });
        const loginmessage = {
            Name: name
        }
        fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }),
            body: JSON.stringify(loginmessage),
            mode: 'cors', 
            redirect: 'follow'
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("Response to POST is", data);
        })
         .catch(err => {
            console.log("Error receiving POST response", err);
        });        

    }

    connectToPlayroom(){
        console.log("Name set and opening connection..");
        const ws = new WebSocket("ws://localhost:8080/websocket");
        this.setState({ wsconn: ws })
        
        ws.onopen = () => {
            const message = {
                Messagetype : "person",
                Payload : {
                    Name : this.state.playername
                }
            }
            ws.send(JSON.stringify(message));
        };

        ws.onmessage = (evt) => {
            let message = JSON.parse(evt.data);

            console.log("Message type", message.Messagetype);
            console.log("Message payload", message.Payload);

            if(message.Messagetype === "tables"){
                //const tables = [...this.state.tables, table];
                this.setState( { tables: message.Payload })
            }
        };

        ws.onclose = () => {
            console.log("Connection closed");
        };
    }

    render(){
        return (
            <div>
                <div className="row"> 
                    <Player playername={ this.state.playername } onSubmitName={ this.setName }/>
                </div>
                <div className="row"> 
                    <TableList tables={ this.state.tables } /> 
                    <TableCreate onTableCreate={ this.createTable }/>
                </div>
                <div className="row"> 
                    <Table name="table1" players={ this.state.players } />
                </div>
            </div>
        );
    }
}