import React, { Component } from 'react';

export default class Player extends Component {

    constructor(props){
        super(props);

        this.state = {
            name: props.playername || ""
        }

        this.formSubmit = this.formSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    formSubmit(event){
        this.props.onSubmitName(this.state.name);
        event.preventDefault();
    }

    handleChange(event){
        this.setState({ name: event.target.value });
    }

    render(){
        return (
            <div>
            { this.props.playername ? 
                <span>Welcome { this.props.playername }</span>
                :
                <form onSubmit={ this.formSubmit }>
                    <div>
                        <label htmlFor="namefield">Who are you?</label>
                        <input id="namefield" 
                                type="text" 
                                onChange={ this.handleChange } 
                                value={ this.state.name } 
                                placeholder="type your name.." 
                        />
                    </div>
                    <div>
                        <input type="submit" value="save" />
                    </div>
                </form>
            }
            </div>
        );
    }
}