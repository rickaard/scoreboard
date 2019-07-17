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
      scores: undefined,
      holeAmount: 18,
    }
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  // set state.showmodal to false when clicked outside of the modal
  // and empty the input-field
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



  // Add player name to state.players
  addPlayer = () => {
    this.setState({
      players: this.state.players.concat(this.state.inputValue),
      inputValue: '',
      showModal: false,
    })
  }

  // Add player name to state.players when press on Enter
  handleKeyPress = (event) => {
    if(event.keyCode === 13) {

      this.setState({
        players: this.state.players.concat(this.state.inputValue),
        showModal: false,
        inputValue: ''
      })
    }
  }


  onUpdateScore = (playerIndex, holeIndex, score) => {
    this.setState(prevState => {
        const copiedScores = [].concat(prevState.scores);
        const copiedHoleScores = [].concat(copiedScores[holeIndex]);
        copiedHoleScores[playerIndex] = score;

        copiedScores[holeIndex] = copiedHoleScores;

        return {
            scores: copiedScores
        };
    });
    console.log(this.state);
  }



  // Remove player name from state.player
  removePlayer = (i) => {
    this.setState({
      players: this.state.players.filter((item, j) => i !== j)
    })

  }

  // Add correct amount of arrays to the state.score-array
  // and toggle state.showtable to switch view to the scoreboard table
  showTable = () => {

    const scores = [];
    for(let i = 0; i < this.state.holeAmount; i++) {
      scores[i] = this.state.players.map(p => 0);
    }

    this.setState({
      showTable: !this.state.showTable,
      scores: scores,
    })

    console.log(this.state.players);
    console.log(this.state.score);
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
          players={this.state.players}
          scores={this.state.scores}
          onUpdateScore={this.onUpdateScore}
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
