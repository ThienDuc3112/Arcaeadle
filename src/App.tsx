import { useContext } from "react";
import GuessCard from "./GuessCard";
import AutocompleteInput from "./TextWithSuggestion";
import { AppContext } from "./context";

function App() {
  const { pastGuesses, newGame, solution } = useContext(AppContext);

  if (!solution) {
    return (
      <div className="flex justify-center my-12">
        <button
          onClick={newGame}
          className="w-32 p-4 text-white bg-blue-500 rounded-md align-middle justify-center text-center"
        >
          <b>New game</b>
        </button>
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-center my-12">
        <button
          onClick={newGame}
          className="w-32 p-4 text-white bg-blue-500 rounded-md align-middle justify-center text-center"
        >
          <b>New game</b>
        </button>
      </div>

      <AutocompleteInput />

      <div>
        <div>{/** Current result here */}</div>
        <div className="flex flex-col-reverse">
          {pastGuesses.map((guess, i) => {
            return <GuessCard id={guess.id} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
