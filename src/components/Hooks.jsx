import React from 'react';

const Hooks = () => {
  const [board, setBoard] = React.useState(Array(9).fill(null));
  const [xTurn, setXTurn] = React.useState(true);

  const handleClick = (index) => {
    if (xTurn) {
      board[index] = 'X';
    } else {
      board[index] = 'O';
    }
    setXTurn(!xTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXTurn(true);
  };

  return { board, xTurn, handleClick, resetGame };
};

export default Hooks;
