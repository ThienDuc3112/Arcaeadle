import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { AppContext } from "./context";

export default function ArcaeadleInput() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<
    { search: string; id: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchArray, songList, guess } = useContext(AppContext);

  const generateSuggestions = useCallback(
    (value: string) => {
      const searches = searchArray ?? [];
      return searches
        .filter((suggestion) =>
          suggestion.search.toLowerCase().includes(value.toLowerCase())
        )
        .filter((val, i, self) => {
          return self.findIndex((value) => value.id == val.id) == i;
        });
    },
    [searchArray]
  );

  useEffect(() => {
    if (input.length > 0) {
      setSuggestions(generateSuggestions(input));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [generateSuggestions, input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSuggestionClick = (suggestion: {
    search: string;
    id: string;
  }) => {
    setInput("");
    setShowSuggestions(false);
    // inputRef.current?.focus();
    guess(suggestion.id);
  };

  return (
    <div className="w-full justify-center items-center flex mb-12 mt-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const matches = searchArray?.filter(
            (search) =>
              search.search.toLowerCase().trim() === input.trim().toLowerCase()
          );

          if (!matches || matches.length == 0) {
            alert("Song don't exist");
            return;
          }

          guess(matches[0].id);
          setInput("");
        }}
        className="relative w-80 gap-4 flex flex-row"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type to search..."
        />

        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 w-full top-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {songList?.[suggestion.id].title_localized.en}
              </li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          className="bg-blue-500 rounded-md p-4 text-white text-center justify-center align-middle"
        >
          <b>Guess</b>
        </button>
      </form>
    </div>
  );
}
