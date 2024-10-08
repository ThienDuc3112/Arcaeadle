import { useState } from "react";

interface Guess {
  name: string;
  difficutly: "PST" | "PRS" | "FTR" | "ETR" | "BYD";
}

function App() {
  const [guess, setGuess] = useState("");
  const [diff, setDiff] = useState<Guess["difficutly"] | "">("");
  const [pastGuesses, setPastGuesses] = useState<Guess[]>([]);
  const [checkError, setCheckError] = useState(false);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (diff === "") {
            setCheckError(true);
          } else {
            setPastGuesses((prev) => [
              ...prev,
              { name: guess, difficutly: diff },
            ]);
            setDiff("");
            setGuess("");
          }
        }}
      >
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Song title"
        />
        <select
          value={diff}
          onChange={(e) => {
            setDiff(e.target.value as Guess["difficutly"]);
            setCheckError(false);
          }}
          className={`mt-1 block py-2 px-3 border ${
            !checkError ? "border-gray-300" : "border-red-500"
          } bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        >
          <option value={"PST"}>Past</option>
          <option value={"PRS"}>Present</option>
          <option value={"FTR"}>Future</option>
          <option value={"ETR"}>Eternal</option>
          <option value={"BYD"}>Beyond</option>
          <option value="" disabled hidden>
            Difficulty
          </option>
        </select>
        <button type="submit">Guess</button>
      </form>

      <div>
        <div>{/** Current result here */}</div>
        <div>
          {pastGuesses.map((guess) => {
            return <GuessCard guess={guess} />;
          })}
        </div>
      </div>
    </div>
  );
}

const GuessCard = ({ guess }: { guess: Guess }) => {
  return (
    <div>
      {guess.name} - {guess.difficutly}
    </div>
  );
};

export default App;
