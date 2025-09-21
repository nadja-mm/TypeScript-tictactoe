import { useState } from "react";
import "./App.css";

import type { Board, Player } from "./types";
import { emptyBoard, calculateWinner } from "./utils/game";

import BoardView from "./components/Board";
import Status from "./components/Status";
import Controls from "./components/Controls";

export default function App() {
  const [board, setBoard] = useState<Board>(emptyBoard());

  const winner: Player | null = calculateWinner(board);
  const moves = board.filter(Boolean).length;
  const next: Player = moves % 2 === 0 ? "X" : "O";
  const isDraw = !winner && moves === 9;
  const isEmpty = moves === 0;

  function handleClick(index: number) {
    setBoard((prev) => {
      // blockera klick om rutan är tagen eller spelet redan är avgjort
      if (prev[index] || calculateWinner(prev)) return prev;

      const nextBoard = [...prev];
      // beräkna rätt spelare utifrån brädet (robustare än separat state)
      const nextPlayer: Player =
        prev.filter(Boolean).length % 2 === 0 ? "X" : "O";
      nextBoard[index] = nextPlayer;

      return nextBoard;
    });
  }

  function resetGame() {
    setBoard(emptyBoard());
  }

  return (
    <div className="app">
      <h1>Tic-Tac-Toe</h1>

      <Status winner={winner} isDraw={isDraw} next={next} />

      <BoardView board={board} winner={winner} onCellClick={handleClick} />

      <Controls isEmpty={isEmpty} onReset={resetGame} />
    </div>
  );
}


