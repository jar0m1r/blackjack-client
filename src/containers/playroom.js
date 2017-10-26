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
            username: null,
            userid: null,
            tables: [],
            table: null,
            wsconn: null,
            wstable: null
        }

        this.login = this.login.bind(this)
        this.createTable = this.createTable.bind(this)
        this.connectToPlayroom = this.connectToPlayroom.bind(this)
        this.jointable = this.jointable.bind(this)
        this.connectToTable = this.connectToTable.bind(this)
    }

    createTable(table){
        console.log("table created with seats:", table.numseats)
        const message = {
            name : table.name,
            gametype: "blackjack",
            numseats: Number(table.numseats)
        }

        fetch('http://localhost:8080/api/tables/', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }),
            body: JSON.stringify(message),
            mode: 'cors', 
            redirect: 'follow'
        })
        .then(response => {
            return response.json()
        })
        .then(table => {
            console.log("Tables has been created with id", table.id);
        })
        .catch(err => {
            console.log("Error receiving POST response", err);
        });  

    }

    login(name){

        const loginmessage = {
            name: name
        }
        fetch('http://localhost:8080/api/users/', {
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
            return response.json()
        })
        .then(user => {
            this.setState({ username: user.name, userid: user.id });
            this.connectToPlayroom(); //TODO make this detached from the login function, better based on state (?)
        })
        .catch(err => {
            console.log("Error loggin in", err);
        });        

    }

    connectToPlayroom(){
        console.log("Name set and opening connection..");
        const ws = new WebSocket("ws://localhost:8080/ws/");
        this.setState({ wsconn: ws })
        
        ws.onopen = () => {
            const message = {
                messagetype : "person",
                payload : {
                    id : this.state.userid
                }
            }
            ws.send(JSON.stringify(message));
        };

        ws.onmessage = (evt) => {
            let message = JSON.parse(evt.data);
            console.log("Message", message);
/*             console.log("Message type", message.messagetype);
            console.log("Message payload", message.payload); */
            this.setState( { tables: message })

            if(message.messagetype === "tables"){
                //const tables = [...this.state.tables, table];
                this.setState( { tables: message.payload })
            }
        };

        ws.onclose = () => {
            console.log("Connection closed");
        };
    }

    jointable(tableId){
        console.log("Joining table", tableId)
        const joinmessage = {
            id: this.state.userid
        }
        fetch(`http://localhost:8080/api/tables/${ tableId }/join`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }),
            body: JSON.stringify(joinmessage),
            mode: 'cors', 
            redirect: 'follow'
        })
        .then(response => {
            return response.json()
        })
        .then(table => {
            console.log("Succesfully joined table:", table);
            this.setState({ table: table });
            this.connectToTable() // possible async issues here due to setState function
        })
        .catch(err => {
            console.log("Error joining table", err);
        });    
    }

    connectToTable(){
        console.log("Joined table and opening connection..");
        const ws = new WebSocket(`ws://localhost:8080/ws/${ this.state.table.id }`);
        this.setState({ wstable: ws })
        
        ws.onopen = () => {
            const message = {
                messagetype : "person", //stupid. Change this to dedicated message type
                payload : {
                    id : this.state.userid
                }
            }
            ws.send(JSON.stringify(message));
        };

        ws.onmessage = (evt) => {
            let message = JSON.parse(evt.data);
            console.log("Table message", message);
            this.setState( { table: message })
        };

        ws.onclose = () => {
            console.log("Connection closed");
        };
    }

    render(){
        return (
            <div>
                <div className="row"> 
                    <Player username={ this.state.username } onSubmit={ this.login }/>
                </div>

                <div className="row"> 
                    <TableList tables={ this.state.tables } onSelect={ this.jointable } /> 
                    <TableCreate onTableCreate={ this.createTable }/>
                </div>

                { this.state.table &&
                    <div className="row"> 
                        <Table table={ this.state.table } />
                    </div>
                }
            </div>
        );
    }
}