import { useState } from "react";

const LifeCounter = () => {
  const [life, setLife] = useState(40);

  return (
    <div className="flex flex-col items-center gap-4 p-6 text-center">
      <p className="text-5xl font-mono">{life}</p>
      <div className="flex gap-4">
        <button
          onClick={() => setLife(life + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          +1
        </button>
        <button
          onClick={() => setLife(life - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          -1
        </button>
      </div>
    </div>
  );
};

export default LifeCounter;
