import React, { Component } from 'react';
import './Card.css';
import { faArrowRight, faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * Props
 * - description  valeur de l'input
 * - showButtons  int. Indique quel bouton (flèche gauche/droite) afficher
 *                showButtons = 0       affiche 0 boutons 
 *                showButtons = 1 = 01  affiche la flèche droite 
 *                showButtons = 2 = 10  affiche la flèche gauche 
 *                showButtons = 3 = 11  affiche les deux 
 */
class Card extends Component {
  constructor(props){
    super(props);
    this.state = {
      description: this.props.description,
    }
  }

  _handleRemove = () => {
    this.props.handleRemove(this.props.id);
  }
  
  _handleGoLeft = () => {
    if(this.props.showLeftButton){ 
      this.props.handleGoLeft(this.props.id, this.state.description);
    }
  }

  _handleGoRight = () => {
    if(this.props.showRightButton){
      this.props.handleGoRight(this.props.id, this.state.description);
    }
  }

  _handleChangeDescription = (event) => {
    this.setState({
      description: event.target.value,
    })
  }

  render() {
    const { showLeftButton, showRightButton } = this.props; 
    return (
      <div className="Card">
      
        <button className="Button-default Button-remove" onClick={this._handleRemove}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <textarea value={this.state.description} className="Description" name="description" onChange={this._handleChangeDescription}/>

        <div className="Card-footer">
        { showLeftButton && 
          <button className="Button-default mr5" onClick={this._handleGoLeft}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        }
        { showRightButton &&
          <button className="Button-default ml5" onClick={this._handleGoRight}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        }
        </div>

      </div>
    );
  }
}

export default Card;
