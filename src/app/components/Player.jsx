import PlayerNameEditor from "./PlayerNameEditor";

const Player = ({ index, data, onUpdate, players }) => {
    const { name, life, poison, commander, rotation } = data;
  
    const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
  
    const changeCommander = (sourceIndex, delta) => {
      const newAmount = Math.max(0, (commander[sourceIndex] || 0) + delta);
      onUpdate(index, {
        commander: { ...commander, [sourceIndex]: newAmount },
      });
    };
  
    const rotate = () => {
      onUpdate(index, {
        rotation: (rotation + 180) % 360,
      });
    };
  
    return (
      <div className="border p-2 rounded shadow text-center bg-[#333] transition-transform duration-300" style={{ transform: `rotate(${rotation}deg)` }}>

        <div className="grid grid-cols-2 gap-2">
        <div className="dmg-wrapper">
            <PlayerNameEditor
                name={name}
                onChange={(newName) => onUpdate(index, { name: newName })}
            />
            {/* Life */}
            <div>
                <p className="text-2xl">{life}</p>
                <div className="flex justify-center gap-2">
                <button
                    onClick={() => onUpdate(index, { life: life + 1 })}
                    className="h-[24px] w-[24px] bg-green-500 text-white rounded"
                >
                    +
                </button>
                <button
                    onClick={() => onUpdate(index, { life: life - 1 })}
                    className="h-[24px] w-[24px] bg-red-500 text-white rounded"
                >
                    -
                </button>
                </div>
            </div>
    
            {/* Poison */}
            <div className="mb-4">
                <p className="text-xl text-purple-700">Poison: {poison}</p>
                <div className="flex justify-center gap-2">
                <button
                    onClick={() => onUpdate(index, { poison: Math.min(poison + 1, 10) })}
                    disabled={poison >= 10}
                    className="h-[24px] w-[24px] bg-purple-600 text-white rounded disabled:opacity-50"
                >
                    +
                </button>
                <button
                    onClick={() => onUpdate(index, { poison: Math.max(poison - 1, 0) })}
                    disabled={poison <= 0}
                    className="h-[24px] w-[24px] bg-purple-400 text-white rounded disabled:opacity-50"
                >
                    -
                </button>
                </div>
            </div>

            <button
            onClick={rotate}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
          >
            Rotate ↻
          </button>
        </div>
  
            {/* Commander Damage */}
            <div>
                <p className="text-md font-semibold mb-2">Commander Damage</p>
                <div className="grid gap-2">
                {players.map((opponent, i) =>
                    i !== index ? (
                    <div key={i} className="flex flex-col justify-between items-center">
                        <span className="text-sm">From {opponent.name}</span>
                        <div className="flex gap-1">
                        <button
                            onClick={() => changeCommander(i, -1)}
                            disabled={(commander[i] || 0) <= 0}
                            className="h-[24px] w-[24px] bg-red-400 text-white rounded text-sm disabled:opacity-50"
                        >
                            -
                        </button>
                        <span className="w-6 text-center">{commander[i] || 0}</span>
                        <button
                            onClick={() => changeCommander(i, 1)}
                            disabled={(commander[i] || 0) >= 21}
                            className="h-[24px] w-[24px] bg-green-400 text-white rounded text-sm disabled:opacity-50"
                        >
                            +
                        </button>
                        </div>
                    </div>
                    ) : null
                )}
                </div>
            </div>
        </div>
        </div>
    );
  };

export default Player;
