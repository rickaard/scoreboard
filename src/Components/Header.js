import React, { Component } from 'react'

export class Header extends Component {
    render() {
        return (
            <header className="header-wrapper">
                <h1>SCOREBOARD</h1>
                <button onClick={ () => {this.props.toggleModal()} } className="btn btn-transparent">+ Add Player</button>
            </header>
        )
    }
}

export default Header
