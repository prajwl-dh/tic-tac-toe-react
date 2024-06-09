import React, { useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import Hooks from './Hooks';

export default function TicTacToe() {
  const { board, xTurn, handleClick, resetGame, winner, tie } = Hooks();
  const { width, height } = useWindowSize();
  const audioRef = useRef(null); // Create a ref to store the audio instance

  useEffect(() => {
    if (winner === 'X' || winner === 'O') {
      if (audioRef.current) {
        audioRef.current.pause(); // Pause if an audio instance already exists
      }
      const audio = new Audio('/winningSound.mp3'); // Create a new audio instance
      audio.loop = true; // Set loop to true
      audio
        .play()
        .catch((error) => console.error('Audio playback failed:', error));
      audioRef.current = audio; // Store the audio instance in the ref
    } else if (tie?.length > 0) {
      if (audioRef.current) {
        audioRef.current.pause(); // Pause if an audio instance already exists
      }
      const audio = new Audio('/tieSound.wav'); // Create a new audio instance
      audio
        .play()
        .catch((error) => console.error('Audio playback failed:', error));
      audioRef.current = audio; // Store the audio instance in the ref
    }
  }, [winner, tie]);

  // Function to reset the game and stop the audio
  const handleResetGame = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the audio when the game is reset
      audioRef.current = null; // Clear the audio reference
    }
    resetGame();
  };

  return (
    <div className='flex flex-col gap-10 md:gap-5 justify-center items-center h-screen w-screen'>
      <p className='text-[3rem] md:text-[6rem] font-bold leading-none text-gray-800'>
        Tic Tac Toe
      </p>
      <div className='bg-slate-200 flex flex-col backdrop-blur-sm bg-opacity-40 rounded-lg shadow-sm w-[96vw] md:w-[60vw]'>
        <div className='flex flex-row justify-between items-end p-2 md:p-5'>
          {winner === 'X' || winner === 'O' ? (
            <p className='text text-gray-700 font-bold text-3xl'>
              {'Player ' + winner + ' wins'}
            </p>
          ) : tie?.length > 0 ? ( // Check if all squares are filled
            <p className='text text-gray-700 font-bold text-3xl'>
              It&apos;s a Tie!
            </p>
          ) : (
            <p className='text text-gray-700 font-bold text-3xl'>
              <span className='text font-normal'>
                {xTurn ? `X's turn` : `O's turn`}
              </span>
            </p>
          )}
          <button
            onClick={handleResetGame} // Use the new handleResetGame function
            className='px-2 py-1 rounded-md bg-red-600 text-white hover:bg-red-500 hover:scale-105 active:bg-red-500 transition duration-300 text-xl'
          >
            {winner == 'X' || winner == 'O' || tie?.length > 0
              ? 'Play Again'
              : 'Reset'}
          </button>
        </div>
        <div className='grid grid-cols-3 m-2 md:m-5 border-2 border-gray-500 rounded-sm'>
          {board.map((_, index) => {
            return (
              <button
                className={`border-2 border-gray-500 h-24 md:h-36 text-5xl text-gray-700 overflow-hidden group ${
                  winner?.length > 0 || tie?.length > 0
                    ? 'cursor-not-allowed'
                    : ''
                } ${
                  board[index] === 'X' || board[index] === 'O'
                    ? 'bg-white transition duration-200 cursor-not-allowed'
                    : ''
                }`}
                key={index}
                onClick={() => {
                  handleClick(index);
                }}
                disabled={
                  winner === 'X' ||
                  winner === 'O' ||
                  tie?.length > 0 ||
                  board[index] === 'X' ||
                  board[index] === 'O'
                    ? true
                    : false
                }
              >
                <p
                  className={`text transition duration-200 ${
                    board[index] ? 'text-gray-700' : 'text-transparent'
                  } ${
                    winner?.length > 0 || tie?.length > 0
                      ? ''
                      : 'group-hover:text-gray-500'
                  }`}
                >
                  {board[index] ? board[index] : xTurn ? 'X' : 'O'}
                </p>
              </button>
            );
          })}
        </div>
      </div>
      {winner == 'X' || winner == 'O' || tie?.length > 0 ? (
        <Confetti width={width} height={height} />
      ) : null}
    </div>
  );
}
