import React, {Component} from 'react';
import Square from './square';

export default class Board extends Component {
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  renderRow(no) {
    return (
      <div className="board-row">
        {this.renderSquare(no * 3)}
        {this.renderSquare(no * 3 + 1)}
        {this.renderSquare(no * 3 + 2)}
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.renderRow(0)}
        {this.renderRow(1)}
        {this.renderRow(2)}
      </div>
    );
  }
}

