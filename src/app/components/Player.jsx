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
      <div className="border p-4 rounded shadow text-center bg-[#333] transition-transform duration-300" style={{ transform: `rotate(${rotation}deg)` }}>
          <PlayerNameEditor
            name={name}
            onChange={(newName) => onUpdate(index, { name: newName })}
          />
  
          {/* Life */}
          <div className="mb-4">
            <p className="text-4xl">Life: {life}</p>
            <div className="flex justify-center gap-2 mt-2">
              <button
                onClick={() => onUpdate(index, { life: life + 1 })}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                +
              </button>
              <button
                onClick={() => onUpdate(index, { life: life - 1 })}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                -
              </button>
            </div>
          </div>
  
          {/* Poison */}
          <div className="mb-4">
            <p className="text-xl text-purple-700">Poison: {poison}</p>
            <div className="flex justify-center gap-2 mt-2">
              <button
                onClick={() => onUpdate(index, { poison: Math.min(poison + 1, 10) })}
                disabled={poison >= 10}
                className="px-3 py-1 bg-purple-600 text-white rounded disabled:opacity-50"
              >
                +
              </button>
              <button
                onClick={() => onUpdate(index, { poison: Math.max(poison - 1, 0) })}
                disabled={poison <= 0}
                className="px-3 py-1 bg-purple-400 text-white rounded disabled:opacity-50"
              >
                -
              </button>
            </div>
          </div>
  
          {/* Commander Damage */}
          <div>
            <p className="text-md font-semibold mb-2">Commander Damage</p>
            <div className="grid gap-2">
              {players.map((opponent, i) =>
                i !== index ? (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-sm">From {opponent.name}</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => changeCommander(i, -1)}
                        disabled={(commander[i] || 0) <= 0}
                        className="px-2 py-1 bg-red-400 text-white rounded text-sm disabled:opacity-50"
                      >
                        -1
                      </button>
                      <span className="w-6 text-center">{commander[i] || 0}</span>
                      <button
                        onClick={() => changeCommander(i, 1)}
                        disabled={(commander[i] || 0) >= 21}
                        className="px-2 py-1 bg-green-400 text-white rounded text-sm disabled:opacity-50"
                      >
                        +1
                      </button>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
  
          <button
            onClick={rotate}
            className="mt-4 px-3 py-1 bg-blue-500 text-white rounded text-sm"
          >
            Rotate ↻
          </button>
        </div>
    );
  };

export default Player;
