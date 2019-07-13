import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

export class Modal extends Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
      }

    componentDidUpdate() {
    this.textInput.current.focus();
    }

    modalStyle = () => {
        return {
            display: this.props.showModal ? 'flex' : 'none'
        }
    }

    render() {
        
        const closeBtnStyle = {
            cursor: 'pointer',
            position: 'absolute',
            top: '4px',
            right: '11px',
            fontWeight: '700'
        }

        const checkStyle = {
            fontSize: '2em',
            color: '#0a92b7'
        }
        

        return (
            <div className="modal" style={ this.modalStyle()} onClick={(event) => { this.props.handleOutsideClick(event) }}>
                <div className="modal-content">
                    <span style={closeBtnStyle} onClick={ () => { this.props.toggleModal() } }>X</span>
                    <label htmlFor="playerName">Player name:</label>
                    <div className="input-wrapper">
                        <input
                            ref={this.textInput}
                            type="text" 
                            id="playerName" 
                            onChange={ (event) => { this.props.handleChange(event) } } 
                            value={this.props.inputValue} 
                            onKeyDown={ (event) => { this.props.handleKeyPress(event) } }
                        />
                        {/* <button id="inputAdd" className="btn btn-add" onClick={ (event) => { this.props.addPlayer(event) } }>+</button> */}
                        <button id="inputAdd" className="btn btn-add" onClick={ (event) => { this.props.addPlayer(event) } }><FontAwesomeIcon style={checkStyle} icon={faUserPlus}/></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal
