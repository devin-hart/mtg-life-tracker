"use client";
import { useState, useEffect } from "react";
import Player from "./components/Player";
import ConfirmModal from "./components/ConfirmModal";

const initialPlayers = (count) =>
  Array.from({ length: count }, (_, i) => ({
    name: `Player ${i + 1}`,
    life: 40,
    poison: 0,
    commander: {},
    rotation: 0,
  }));

const loadPlayersFromSession = () => {
  if (typeof window === "undefined") return initialPlayers(2); 
  const raw = sessionStorage.getItem("players");
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      return parsed.map((p, i) => ({
        name: p.name || `Player ${i + 1}`,
        rotation: p.rotation ?? 0,
        life: 40,
        poison: 0,
        commander: {},
      }));
    } catch (e) {
      console.error("Error parsing players from sessionStorage:", e);
    }
  }
  return initialPlayers(2);
};

export default function App() {
  const [players, setPlayers] = useState(loadPlayersFromSession);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showControls, setShowControls] = useState(true);


  const addPlayer = () => {
    if (players.length < 6) {
      const newIndex = players.length;
      const newPlayer = {
        name: `Player ${newIndex + 1}`,
        life: 40,
        poison: 0,
        commander: {},
        rotation: 0,
      };

      const updated = players.map((p) => ({
        ...p,
        commander: { ...p.commander, [newIndex]: 0 },
        rotation: p.rotation ?? 0,
      }));

      newPlayer.commander = Object.fromEntries(
        updated.map((_, i) => [i, 0])
      );

      setPlayers([...updated, newPlayer]);
    }
  };

  const removePlayer = () => {
    if (players.length > 2) {
      const trimmed = players.slice(0, -1).map((p) => {
        const updatedCommander = { ...p.commander };
        delete updatedCommander[players.length - 1];
        return { ...p, commander: updatedCommander };
      });
      setPlayers(trimmed);
    }
  };

  const updatePlayer = (index, updates) => {
    setPlayers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, ...updates } : p))
    );
  };

  const resetAllPlayers = () => {
    setPlayers(
      players.map((p, i) => {
        const commander = Object.fromEntries(
          players.map((_, j) => [j, 0]).filter(([j]) => j !== i)
        );
        return {
          ...p,
          life: 40,
          poison: 0,
          commander,
        };
      })
    );
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const persistData = players.map((p) => ({
        name: p.name,
        rotation: p.rotation,
      }));
      setIsClient(true);
      sessionStorage.setItem("players", JSON.stringify(persistData));
    }
  }, [players]);

  
  let gridCols = "grid-cols-1";
  if (players.length >= 5) gridCols = "grid-cols-3";
  else if (players.length >= 3) gridCols = "grid-cols-2";
  
  if (!isClient) return null;

  return (
    <div className="p-6 text-center">
      <div className="flex justify-center mb-4">
  <button
    onClick={() => setShowControls(!showControls)}
    className="text-white rounded"
  >
    {showControls ? "Hide Controls" : "Show Controls"}
  </button>
</div>

      {showControls && (
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            onClick={removePlayer}
            disabled={players.length <= 2}
            className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
          >
            - Player
          </button>
          <p className="text-xl">{players.length} Players</p>
          <button
            onClick={addPlayer}
            disabled={players.length >= 6}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
          >
            + Player
          </button>
        </div>

        <button
          onClick={() => setShowConfirmModal(true)}
          className="px-4 py-2 bg-gray-600 text-white rounded"
        >
          Reset All
        </button>
      </div>
      )}

      <div className={`grid gap-2 ${gridCols}`}>
        {players.map((player, i) => (
          <Player
            key={i}
            index={i}
            data={player}
            onUpdate={updatePlayer}
            players={players}
          />
        ))}
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        onConfirm={() => {
          resetAllPlayers();
          setShowConfirmModal(false);
        }}
      />
    </div>
  );
};

