import Square from "./Square";
import type { Board, Player } from "../types";

type BoardProps = {
board: Board;
winner: Player | null;
onCellClick: (index: number) => void;
};

export default function Board({ board, winner, onCellClick }: BoardProps) {
return (
    <div className="board">
    {board.map((cell, i) => (
        <Square
        key={i}
        value={cell}
        index={i}
        disabled={Boolean(cell) || Boolean(winner)}
        onClick={() => onCellClick(i)}
        />
))}
    </div>
);
}
