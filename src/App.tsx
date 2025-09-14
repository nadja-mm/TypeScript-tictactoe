import {useState} from "react";
import "./App.css";

type Player = "X" | "O";
type Cell = Player | null;
type Board = Cell[];

const WIN_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const emptyBoard = (): Board => Array.from({length: 9}, () => null);

function calculateWinner(board: Board): Player | null{
  for (const [a, b, c] of WIN_LINES){
    if (board[a] && board[a] === board[b] && board[a] === board[c]){
      return board[a];
    }
  }
  return null;
}

export default function App(){
  const [board, setBoard] = useState<Board>(emptyBoard());

  const winner = calculateWinner(board);
  const moves = board.filter(Boolean).length;
  const next: Player = moves % 2 === 0 ? "X" : "O";
  const isDraw = !winner && moves === 9;
  const isEmpty = moves === 0;

  function handleClick(index: number){
    setBoard((prev) =>{
      //blockera klick om rutan är tagen eller spelet redan är avgjort
      if (prev[index] || calculateWinner(prev)) return prev;

      const nextBoard = [...prev];
      //beräkna rätt spelare utifrån brädet(robustare än separat state)
      const nextPlayer: Player =
        prev.filter(Boolean).length % 2 === 0 ? "X" : "O";
      nextBoard[index] = nextPlayer;
      return nextBoard;
    });
  }

  function resetGame(){
    setBoard(emptyBoard());
  }

  return (
    <div className="app">
      <h1>Tic-Tac-Toe</h1>

      <div className="status">
        {winner ? (
          <span>Vinnare:{winner}</span>
        ) : isDraw ? (
          <span>Oavgjort!</span>
        ) : (
          <span>Tur:{next}</span>
        )}
      </div>

      <div className="board">
        {board.map((cell, i) => (
          <button
            key={i}
            className="cell"
            onClick={() => handleClick(i)}
            disabled={Boolean(cell) || Boolean(winner)}
            aria-label={`Ruta ${i + 1}`}
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="actions">
        <button className="reset" onClick={resetGame}>
          {isEmpty ? "Starta spelet" : "Starta om"}
        </button>
      </div>
    </div>
  );
}

