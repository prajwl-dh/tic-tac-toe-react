import { useEffect, useRef } from 'react';
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
    <div className='flex flex-col gap-10 md:gap-6 justify-center items-center h-screen w-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500'>
      <p className='text-[3rem] md:text-[5rem] font-extrabold text-gray-800 dark:text-white drop-shadow-sm'>
        Tic Tac Toe
      </p>

      <div className='backdrop-blur-md bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/20 shadow-lg rounded-3xl p-6 md:p-10 w-[95vw] md:w-[60vw] max-w-2xl transition-all duration-300'>
        <div className='flex flex-row justify-between items-center mb-6'>
          {winner === 'X' || winner === 'O' ? (
            <p className='text-gray-800 dark:text-white font-bold text-2xl md:text-3xl'>
              🎉 Player {winner} wins!
            </p>
          ) : tie?.length > 0 ? (
            <p className='text-gray-800 dark:text-white font-bold text-2xl md:text-3xl'>
              🤝 It&apos;s a Tie!
            </p>
          ) : (
            <p className='text-gray-600 dark:text-gray-300 font-medium text-xl md:text-2xl'>
              {xTurn ? "🔷 X's Turn" : "🔶 O's Turn"}
            </p>
          )}

          <button
            onClick={handleResetGame}
            className='bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-xl font-semibold shadow-md hover:scale-105 hover:brightness-110 transition-transform duration-200'
          >
            {winner || tie?.length > 0 ? 'Play Again' : 'Reset'}
          </button>
        </div>

        <div className='grid grid-cols-3 gap-3'>
          {board.map((_, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={
                winner ||
                tie?.length > 0 ||
                board[index] === 'X' ||
                board[index] === 'O'
              }
              className={`w-full aspect-square rounded-2xl text-4xl md:text-6xl font-bold transition-all duration-200 flex items-center justify-center shadow-inner ${
                board[index] === 'X'
                  ? 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                  : board[index] === 'O'
                  ? 'bg-pink-200 text-pink-800 dark:bg-pink-900 dark:text-pink-300'
                  : 'bg-white/30 dark:bg-white/10 text-transparent hover:text-gray-400 dark:hover:text-gray-500 hover:scale-105'
              } ${
                winner || tie?.length > 0
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
            >
              {board[index] || (xTurn ? 'X' : 'O')}
            </button>
          ))}
        </div>
      </div>

      {(winner || tie?.length > 0) && (
        <Confetti width={width} height={height} />
      )}
    </div>
  );
}
