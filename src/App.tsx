import { useState } from "react";
import GuessCard from "./GuessCard";
import AutocompleteInput from "./TextWithSuggestion";

interface Guess {
  id: string;
  // difficutly: "PST" | "PRS" | "FTR" | "ETR" | "BYD";
}

function App() {
  const [pastGuesses, setPastGuesses] = useState<Guess[]>([]);
  return (
    <div>
      <AutocompleteInput
        setGuess={(val) => {
          setPastGuesses((prev) => [
            ...prev,
            {
              id: val,
            },
          ]);
        }}
      />

      <div>
        <div>{/** Current result here */}</div>
        <div className="flex flex-col-reverse">
          {pastGuesses.map((guess) => {
            return <GuessCard id={guess.id} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
