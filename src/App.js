import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      toDo:{
        code:'TD',
        title: 'A faire',
        showLeftButton: false,
        showRightButton: true,
        cards:[
          { 
            description: 'Conversion en mp3',
            id: 1,
          },
          { 
            description: 'Page de recherche',
            id: 2,
          },
          { 
            description: 'Déconnexion',
            id: 3,
          },
        ],
      },
      inProgress:{
        code:'IP',
        title: 'En cours',
        showLeftButton: true,
        showRightButton: true,
        cards:[ { 
          description: 'Enregistrement des sons',
          id: 4,
        },],
      },
      done:{
        code:'DN',
        title: 'Fait',
        showLeftButton: true,
        showRightButton: false,
        cards:[ { 
          description: 'Connexion API',
          id: 5,
        },],
      },
    };
  }

  //----------------------------
  //---------------------------- Boutons
  //----------------------------
  _handleNew = () => {
    const { toDo } = this.state;
    const nbCards = this._calculTotalCard();
    toDo.cards.push({
      description: 'Nouvelle tâche',
      id: nbCards + 1,
    });
    this.setState({
      toDo: toDo,
    })
  }

  _handleRemove = (id, tableCode) => {
    this._removeFromCurrentTable(id, tableCode);
  }
  
  _handleGoLeft = (id, tableCode, currentDescription) => {
    const card = this._removeFromCurrentTable(id, tableCode);
    card.description = currentDescription;
    const codeNextTable = this._getCodeFromTableToAdd(tableCode, 'left');
    this._addInTable(card, codeNextTable);
  }

  _handleGoRight = (id, tableCode, currentDescription) => {
    const card = this._removeFromCurrentTable(id, tableCode);
    card.description = currentDescription;
    const codePreviousTable = this._getCodeFromTableToAdd(tableCode, 'right');
    this._addInTable(card, codePreviousTable);
  }
  //----------------------------
  //---------------------------- Autres opérations
  //----------------------------
  _calculTotalCard = () => {
    return (this.state.toDo.cards.length + this.state.inProgress.cards.length + this.state.done.cards.length)
  }

  _removeFromCurrentTable = (id, tableCode) => {
    const { toDo, inProgress, done } = this.state;
    let card;

    switch(tableCode){
      case 'TD':
        card = toDo.cards.filter(x => x.id === id)[0];
        toDo.cards = toDo.cards.filter(x => x.id !== id);
        this.setState({
          toDo: toDo,
        });
        break;
      case 'IP':
        card = inProgress.cards.filter(x => x.id === id)[0];
        inProgress.cards = inProgress.cards.filter(x => x.id !== id);
        this.setState({
          inProgress: inProgress,
        });
        break;
      case 'DN':
        card = done.cards.filter(x => x.id === id)[0];
        done.cards = done.cards.filter(x => x.id !== id);
        this.setState({
          done: done,
        });
        break;
      default:
        console.log("le code du tableau est incorrect");
        break;
    }
    return card;
  }

  /**
   * @params tableCode = TD, IP ou DN
   * @params operation = 'left' ou 'right'
   * @returns tableCode
   */
  _getCodeFromTableToAdd = (tableCode, operation) => {
    switch(tableCode + '-' + operation){
      case('TD-right'): return 'IP';
      case('IP-right'): return 'DN';
      case('DN-left'):  return 'IP';
      case('IP-left'):  return 'TD';
      default:
        console.log("le code et l'opération ne permettent pas un mouvement");
        break;
    }
  }

  _addInTable = (card, tableCode) => {
    const { toDo, inProgress, done } = this.state;

    switch(tableCode){
      case 'TD':
        toDo.cards.push(card);
        this.setState({
          toDo: toDo,
        });
        break;
      case 'IP':
        inProgress.cards.push(card);
        this.setState({
          inProgress: inProgress,
        });
        break;
      case 'DN':
        done.cards.push(card);
        this.setState({
          done: done,
        });
        break;
      default:
        console.log("le code du tableau est incorrect");
        break;
    }
  }

  render() {
    const { toDo, inProgress, done } = this.state;
    const tables = [toDo, inProgress, done];

    return (
      <div className="App">
        <header className="App-header">
          <h1>Tableaux</h1>
          <button className="Button-new" onClick={this._handleNew}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      
        </header>
        <section className="App-section">
          { tables.map( x =>
            <Board 
              table={x}
              showLeftButton={x.showLeftButton} 
              showRightButton={x.showRightButton} 
              handleGoLeft={this._handleGoLeft}
              handleGoRight={this._handleGoRight}
              handleRemove={this._handleRemove}
              key={x.code}
            />)
          }
        </section>
        <footer className="App-footer">
 
        </footer>
      </div>
    );
  }
}

export default App;
