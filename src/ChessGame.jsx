import React, { useState } from 'react';


function ChessGame() {
  const [board, setBoard] = useState(initializeBoard());
  const [selectedPiece, setSelectedPiece] = useState(null);

  function initializeBoard() {
    // Chess board representation
    const board = Array(8).fill(null).map(() => Array(8).fill(null));

    // Initialize pawns
    for (let i = 0; i < 8; i++) {
      board[1][i] = { piece: 'pawn', player: 'white' };
      board[6][i] = { piece: 'pawn', player: 'black' };
    }

    // Initialize other pieces
    const pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    for (let i = 0; i < 8; i++) {
      board[0][i] = { piece: pieces[i], player: 'white' };
      board[7][i] = { piece: pieces[i], player: 'black' };
    }

    return board;
  }

  function handleSquareClick(row, col) {
    const piece = board[row][col];

    if (selectedPiece) {
      // Move the selected piece to the new position
      const [prevRow, prevCol] = selectedPiece;
      const updatedBoard = [...board];

      updatedBoard[row][col] = updatedBoard[prevRow][prevCol];
      updatedBoard[prevRow][prevCol] = null;

      setBoard(updatedBoard);
      setSelectedPiece(null);
    } else if (piece) {
      // Select the piece if it belongs to the current player
      setSelectedPiece([row, col]);
    }
  }

  function renderSquare(row, col) {
    const piece = board[row][col];
    const isSelected = selectedPiece && selectedPiece[0] === row && selectedPiece[1] === col;

    return (
      <div
        className={`square ${((row + col) % 2 === 0) ? 'light' : 'dark'} ${isSelected ? 'selected' : ''}`}
        key={`${row}-${col}`}
        onClick={() => handleSquareClick(row, col)}
      >
        {piece && <Piece piece={piece.piece} player={piece.player} />}
      </div>
    );
  }

  function Piece({ piece, player }) {
    const pieceIcon = getPieceIcon(piece);

    return (
      <div className={`piece ${player}`}>
        {pieceIcon}
      </div>
    );
  }

  function getPieceIcon(piece) {
    switch (piece) {
      case 'pawn':
        return '♟';
      case 'rook':
        return '♜';
      case 'knight':
        return '♞';
      case 'bishop':
        return '♝';
      case 'queen':
        return '♛';
      case 'king':
        return '♚';
      default:
        return null;
    }
  }

  function resetBoard() {
    setBoard(initializeBoard());
    setSelectedPiece(null);
  }

  function undoMove() {
    // Add logic to undo the previous move
    // You can maintain a stack of moves and pop the last move to revert it
  }

  function checkmateDetection() {
    // Add logic to check if a checkmate has occurred
    // Implement the rules to detect checkmate for both players
  }

  function promotePawn(row, col, player) {
    const pawnToPromote = board[row][col];

    // Add logic to allow the player to select the promoted piece
    // You can show a modal or prompt to select the promoted piece (queen, rook, knight, bishop)

    // Example implementation
    const promotedPiece = window.prompt('Select a piece to promote to: queen, rook, knight, bishop');

    if (promotedPiece) {
      const updatedBoard = [...board];
      updatedBoard[row][col] = { piece: promotedPiece, player };
      setBoard(updatedBoard);
    }
  }

  return (
    <div className="chessboard">
      {board.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((_, colIndex) => renderSquare(rowIndex, colIndex))}
        </div>
      ))}
      <div className="buttons">
        <button onClick={resetBoard}>Reset</button>
        <button onClick={undoMove}>Undo</button>
      </div>
    </div>
  );
}

export default ChessGame;
