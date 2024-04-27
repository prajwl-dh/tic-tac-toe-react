import React from 'react';

export default function TicTacToe() {
  const [board, setBoard] = React.useState(Array(9).fill(null));

  return (
    <div className='flex flex-col gap-10 md:gap-5 justify-center items-center h-screen w-screen'>
      <p className='text-[3rem] md:text-[6rem] font-bold leading-none text-gray-800'>
        Tic Tac Toe
      </p>
      <div className='bg-slate-200 flex flex-col backdrop-blur-sm bg-opacity-40 rounded-lg shadow-sm w-[96vw] md:w-[60vw]'>
        <div className='flex flex-row justify-between items-end p-2 md:p-5'>
          <p className='text text-gray-700 font-bold text-2xl'>
            Turn : <span className='text font-normal'>X</span>
          </p>
          <button className='px-2 py-1 rounded-md bg-red-600 text-white hover:bg-red-500 hover:scale-105 active:bg-red-500 transition duration-300 text-lg'>
            Reset Game
          </button>
        </div>
        <div className='grid grid-cols-3 m-2 md:m-5 border-2 border-gray-500 rounded-sm'>
          {board.map((_, index) => {
            return (
              <button
                className='border-2 border-gray-500 h-24 md:h-36 text-3xl text-gray-700 overflow-hidden'
                key={index}
              >
                X
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
