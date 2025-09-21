import type { Cell } from "../types";

type SquareProps = {
value: Cell;
disabled: boolean;
onClick: () => void;
  index: number; // för aria-label
};

export default function Square({ value, disabled, onClick, index }: SquareProps) {
return (
    <button
    className="cell"
    onClick={onClick}
    disabled={disabled}
    aria-label={`Ruta ${index + 1}`}
    >
    {value}
    </button>
);
}
