import React from 'react';

const Hooks = () => {
  const [board, setBoard] = React.useState(Array(9).fill(null));
  const [xTurn, setXTurn] = React.useState(true);
  const [winner, setWinner] = React.useState(null);
  const [tie, setTie] = React.useState(null);

  const playSound = (player) => {
    const audio = new Audio(`/${player}`); // Adjusted path
    audio
      .play()
      .catch((error) => console.error('Audio playback failed:', error));
  };

  const handleClick = (index) => {
    if (xTurn) {
      board[index] = 'X';
      playSound('xSound.wav');
    } else {
      board[index] = 'O';
      playSound('oSound.wav');
    }
    setWinner(checkWinner());
    setTie(tieChecker());
    setXTurn(!xTurn);
  };

  const resetGame = () => {
    setTie(null);
    setWinner(null);
    setBoard(Array(9).fill(null));
    setXTurn(true);
  };

  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }
  };

  const tieChecker = () => {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        return null;
      }
    }
    return 'Tie';
  };

  return { board, xTurn, handleClick, resetGame, winner, tie };
};

export default Hooks;
