import React, { Component } from 'react';
import Player from './Player';

export class Playerlist extends Component {
    render() {
        return (
            <div className="player-wrapper">
                <h2 style={{textAlign:'center'}}>Players:</h2>
                { this.props.showPlayers.map((p, index) => (
                    <Player key={p} name={p} removePlayer={this.props.removePlayer} index={index}/>
                ))}
            </div>
        )
    }
}

export default Playerlist
