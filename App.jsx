import {  useState } from 'react';
import './App.css'
import GameBoard from './components/GameBoard'
import Player from './components/Player'
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './WinningCombinations';
import GameOver from './GameOver';

const initialGameBoard = [
  [null , null ,null ],
  [null , null ,null ],
  [null , null ,null ],

];




function deriveActivePlayer(gameTurns) {

  let currentPlayer  = 'X';
      
      if(gameTurns.length>0 &&  gameTurns[0].player==='X'){
        currentPlayer =  'O';
      }
  
      return  currentPlayer;

}

function deriveWinner (gameBoard,players) {

}

function App() {

  const [players,setPlayers] = useState({
    'X': 'Player 1',
    'O' : 'Player 2'
  });

  const [gameTurns, setGameTurns] = useState([]);

  //const [winner ,setWinner] = useState();

  //const [activePlayer ,setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for(const turn of gameTurns){
      const {square  , player } = turn ;
      const {row , col } = square;

      gameBoard [row][col]=player;
  }

  let winner ;

  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = 
        gameBoard[combination[0].row][combination[0].col];
    const SecondSquareSymbol = 
        gameBoard[combination[1].row][combination[1].col];
    const ThirdSquareSymbol  = 
        gameBoard[combination[2].row][combination[2].col];

    if(firstSquareSymbol &&
       firstSquareSymbol ===SecondSquareSymbol && 
      firstSquareSymbol ===ThirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }

    }

    const hasDraw = gameTurns.length === 9 && !winner;

  

   function handleSelectSquare (rowIndex , colIndex) {



    //setActivePlayer((curActivePlayer) => curActivePlayer ==='X' ? 'O' : 'X' );

    setGameTurns (prevTurns => {

      const currentPlayer = deriveActivePlayer(prevTurns);

      const UpdatedTurns = [
        
        {square: {row : rowIndex , col : colIndex}, player: currentPlayer }, 
        ...prevTurns
      ];

      return UpdatedTurns;

    });

   }

   function handleRestart() {
    setGameTurns([]);
   }

   function handlePlayerNameChange(symbol,newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]:newName
      }
    }) ;

   }
 

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>   
            <Player
             intialName="Player 1" 
             symbol = "X"
             isActive={activePlayer === 'X'}
             onChangeName={handlePlayerNameChange}
             />
            <Player 
            intialName="Player 2" 
            symbol = "O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
            />          
          </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}

        <GameBoard 
        onSelectSquare={handleSelectSquare} 
        board={gameBoard}/>
      </div>

      <Log turns={gameTurns} />
      
    </main>    
  )
}



export default App
