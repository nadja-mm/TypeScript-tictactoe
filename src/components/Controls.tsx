type ControlsProps = {
    isEmpty: boolean;
    onReset: () => void;
};

export default function Controls({ isEmpty, onReset }: ControlsProps) {
    return (
    <div className="actions">
        <button className="reset" onClick={onReset}>
        {isEmpty ? "Starta spelet" : "Starta om"}
        </button>
    </div>
    );
}
