import { useState } from "react";
import GuessCard from "./GuessCard";

interface Guess {
  name: string;
  // difficutly: "PST" | "PRS" | "FTR" | "ETR" | "BYD";
}

function App() {
  const [guess, setGuess] = useState("");
  const [pastGuesses, setPastGuesses] = useState<Guess[]>([]);

  // const searchArray = useRef<{ search: string; id: string }[]>([]);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setPastGuesses((prev) => [...prev, { name: guess }]);
          setGuess("");
        }}
      >
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Song title"
        />

        <button type="submit">Guess</button>
      </form>

      <div>
        <div>{/** Current result here */}</div>
        <div>
          {pastGuesses.map((guess) => {
            return <GuessCard title={guess.name} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
