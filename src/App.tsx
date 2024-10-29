import { useCallback, useContext, useEffect, useState } from "react";
import GuessCard from "./GuessCard";
import ArcaeadleInput from "./TextWithSuggestion";
import { AppContext } from "./context";
import Modal from "./Modal";

function App() {
  const { pastGuesses, newGame, solution, isWon } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    console.log(`isOpen: ${isOpen}\t isWon: ${isWon}`);
    // if (!isWon) setIsOpen(true);
  }, [isOpen, isWon]);

  const handleNewGame = useCallback(() => {
    setIsOpen(true);
    newGame();
  }, [newGame]);

  if (!solution) {
    return (
      <div className="flex justify-center my-12">
        <button
          onClick={handleNewGame}
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
          onClick={handleNewGame}
          className="w-32 p-4 text-white bg-blue-500 rounded-md align-middle justify-center text-center"
        >
          <b>New game</b>
        </button>
      </div>

      <ArcaeadleInput />

      <Modal
        isOpen={isOpen && isWon}
        onClose={() => {
          setIsOpen(false);
        }}
        title="Congratz"
      >
        <p>You win</p>
      </Modal>

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
