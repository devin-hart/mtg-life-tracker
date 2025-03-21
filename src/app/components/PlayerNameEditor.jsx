import React, { useState, useEffect } from "react";

const PlayerNameEditor = ({ name, onChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(name);
  
    useEffect(() => {
      setDraft(name);
    }, [name]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const trimmed = draft.trim();
      if (trimmed && trimmed !== name) {
        onChange(trimmed);
      }
      setIsEditing(false);
    };
  
    return isEditing ? (
      <form onSubmit={handleSubmit} className="flex gap-2 justify-center mb-2">
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="border p-1 rounded text-center"
        />
        <button type="submit" className="px-2 bg-blue-500 text-white rounded">
          Save
        </button>
      </form>
    ) : (
      <h2
        className="text-lg font-semibold cursor-pointer hover:underline mb-2"
        onClick={() => setIsEditing(true)}
      >
        {name}
      </h2>
    );
  };

export default PlayerNameEditor;
