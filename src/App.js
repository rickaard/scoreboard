import React from 'react';
import Header from './Components/Header';
import Modal from './Components/Modal';
import Playerlist from './Components/Playerlist';
import Table from './Components/Table';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      inputValue: '',
      showTable: false,
      players: [],
      score: [],
      holeAmount: 18,
    }
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  handleOutsideClick = (event) => {
    if (event.target.className === 'modal') {
      this.setState({
        showModal: false,
        inputValue: ''
      })
    }
  }

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value
    })    
  }


  addPlayer = () => {

    this.setState({
      players: this.state.players.concat(this.state.inputValue),
      score: this.state.score.concat(""),
      inputValue: '',
      showModal: false,
    })
  }

  updateScore = (playerIndex, holeIndex, e) => {

    console.log('hela state.score', this.state.score);
    console.log('index score', this.state.score[playerIndex]);
    console.log('med namn och score', this.state.players[playerIndex], this.state.score[playerIndex]);
    
  }

  handleKeyPress = (event) => {
    if(event.keyCode === 13) {

      this.setState({
        players: this.state.players.concat(this.state.inputValue),
        score: this.state.score.concat(""),
        showModal: false,
        inputValue: ''
      })
    }
  }

  removePlayer = (i) => {
    this.setState({
      players: this.state.players.filter((item, j) => i !== j)
    })

  }

  showTable = () => {
    this.setState({
      showTable: !this.state.showTable
    })
    console.log('från showtable-metod',this.state.players);
    console.log('från showtable-metod',this.state.score);
    
  }


  render() {


      let startContent =
      <React.Fragment>  
        <Header toggleModal={this.toggleModal}/>

        <Modal 
          showModal={this.state.showModal} 
          toggleModal={this.toggleModal} 
          handleOutsideClick={this.handleOutsideClick}
          inputValue={this.state.inputValue} 
          handleChange={this.handleChange} 
          addPlayer={this.addPlayer}
          handleKeyPress={this.handleKeyPress}
        />

        <Playerlist showPlayers={this.state.players} removePlayer={this.removePlayer}/>

        <div className="startBtn-wrapper">
          <button id="startBtn" className="btn btn-success" onClick={ () => { this.showTable() } }>Start</button>
        </div>
      </React.Fragment> 

      let tableContent =
      <React.Fragment>
        <Table 
          playerlist={this.state.players} 
          holes={this.state.holeAmount} 
          inputValue={this.state.inputValue} 
          handleChange={this.handleChange} 
          updateScore={this.updateScore} 
        />
      </React.Fragment>


    
    return (
      
      <div id="app">
        { this.state.showTable ? tableContent : startContent } 
      </div>
    )
  }
}

export default App;
