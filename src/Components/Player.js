import React, { Component } from 'react'

export class Player extends Component {
    render() {


        const playerStyle = {
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid #000'
        }

        return (
            <div style={playerStyle}>
                <h3>{this.props.name}</h3>
                <span className="btn-remove" onClick={ (i) => { this.props.removePlayer(this.props.index) } }>x</span>
            </div>
        )
    }
}

export default Player
