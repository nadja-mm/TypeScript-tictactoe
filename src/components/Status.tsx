import type { Player } from "../types";

type StatusProps = {
winner: Player | null;
isDraw: boolean;
next: Player;
};

export default function Status({ winner, isDraw, next }: StatusProps) {
return (
    <div className="status">
    {winner ? (
        <span>Vinnare:{winner}</span>
    ) : isDraw ? (
        <span>Oavgjort!</span>
    ) : (
        <span>Tur:{next}</span>
    )}
    </div>
);
}
