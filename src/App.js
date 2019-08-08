import React from 'react';
import Header from './Components/Header';
import Modal from './Components/Modal';
import Playerlist from './Components/Playerlist';
import Table from './Components/Table';

class App extends React.Component {
  constructor(props) {
    super(props);

    const players = JSON.parse(localStorage.getItem("players")) || [];
    const scores = JSON.parse(localStorage.getItem("result")) || undefined;


    

    this.state = {
      showModal: false,
      inputValue: '',
      showTable: false,
      players: players,
      scores: scores,
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
      scores: undefined
    }, () => {
      localStorage.setItem("players", JSON.stringify(this.state.players));
      localStorage.removeItem("result");
    });

  }


  // Add player name to state.players when press on Enter
  handleKeyPress = (event) => {
    if(event.keyCode === 13) {

      this.setState({
        players: this.state.players.concat(this.state.inputValue),
        inputValue: '',
        showModal: false,
        scores: undefined
      }, () => {
        localStorage.setItem("players", JSON.stringify(this.state.players));
        localStorage.removeItem("result");
        
      });
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
    }, () => {
      localStorage.setItem("result", JSON.stringify(this.state.scores));
    });
  }

  clearStorage = () => {
    localStorage.clear();
    this.setState({
      players: [],
      scores: undefined,
      showTable: false
    })
  }

  // Remove player name from state.player
  removePlayer = (i) => {

    this.setState(prevState => {
      return {
        players: prevState.players.filter((item, j) => i !== j)
      }
    }, () => {
      localStorage.setItem("players", JSON.stringify(this.state.players));
    })
  }

  // Add correct amount of arrays to the state.score-array
  // and toggle state.showtable to switch view to the scoreboard table


  showTable = () => {

    const generateInitialScore = (state) => {
      const emptyScore = []
      for(let i = 0; i < state.holeAmount; i++) {
        emptyScore[i] = state.players.map(p => 0);
      }
      return emptyScore;
    }

    this.setState(prevState => {
      return {
        showTable: !prevState.showTable,
        scores: prevState.scores !== undefined ? prevState.scores : generateInitialScore(prevState)
      }
    });
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
          <button disabled={(this.state.players.length === 0)} id="startBtn" className="btn btn-success" onClick={this.showTable}>{(this.state.scores === undefined) ? 'Start' : 'Fortsätt'}</button>
        </div>
      </React.Fragment>;

      let tableContent =
      <React.Fragment>
        <Table 
          players={this.state.players}
          scores={this.state.scores}
          onUpdateScore={this.onUpdateScore}
          clearStorage={this.clearStorage}
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
