import React, { Component } from 'react';
import './Board.css';
import Card from './Card';

class Board extends Component {

  
  _handleRemove = (id) => {
    this.props.handleRemove(id, this.props.table.code);
  }
  
  _handleGoLeft = (id, currentDescription) => {
    if(this.props.showLeftButton){ 
      this.props.handleGoLeft(id, this.props.table.code, currentDescription);
    }
  }

  _handleGoRight = (id, currentDescription) => {
    if(this.props.showRightButton){
      this.props.handleGoRight(id, this.props.table.code, currentDescription);
    }
  }

  render() {
    const { table, showLeftButton, showRightButton } = this.props; 
    const cards = table.cards;
    const cardsList = (cards) ?
      cards.map( 
        (card) =>  
          <Card description={card.description} 
            showLeftButton={showLeftButton} 
            showRightButton={showRightButton} 
            key={card.id} 
            id={card.id}
            handleGoLeft={this._handleGoLeft}
            handleGoRight={this._handleGoRight}
            handleRemove={this._handleRemove}
          />
      ) 
      : null
    ;

    return (
      <div className="Board">

        <div className="Board-header">
          <h2>{table.title}</h2>
        </div>
      
        <div>
          { cardsList }
        </div>

      </div>
    );
  }
}

export default Board;
