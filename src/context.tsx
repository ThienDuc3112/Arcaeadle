import { createContext, ReactNode, useEffect, useState } from "react";
import { generateSearchArray } from "./util";
import { PackList, Song, SongList } from "./type";

const KEY_SEARCH_ARRAY = "__cache_search_array";
const KEY_SONG_LIST = "__cache_song_list";
const KEY_PACK_LIST = "__cache_pack_list";

export const AppContext = createContext<{
  searchArray:
    | {
        search: string;
        id: string;
      }[]
    | undefined;
  songList: SongList | undefined;
  packList: PackList | undefined;
  newGame: () => void;
  solution: Song | undefined;
  guess: (songId: string) => void;
  pastGuesses: { id: string }[];
  isWon: boolean;
}>({
  searchArray: undefined,
  songList: undefined,
  packList: undefined,
  newGame: () => {},
  solution: undefined,
  guess: (_: string) => {
    _.toLowerCase();
  },
  pastGuesses: [],
  isWon: false,
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [songList, setSongList] = useState<SongList>();
  const [packList, setPackList] = useState<PackList>();
  const [solution, setSolution] = useState<Song | undefined>();
  const [pastGuesses, setPastGuesses] = useState<{ id: string }[]>([]);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [searchArray, setSearchArray] = useState<
    {
      search: string;
      id: string;
    }[]
  >();

  useEffect(() => {
    const songListStr = localStorage.getItem(KEY_SONG_LIST);
    const searchArrayStr = localStorage.getItem(KEY_SEARCH_ARRAY);
    const packListStr = localStorage.getItem(KEY_PACK_LIST);
    let songListVal: SongList | undefined = songListStr
      ? JSON.parse(songListStr)
      : undefined;
    const searchArrayVal: { search: string; id: string }[] | undefined =
      searchArrayStr ? JSON.parse(searchArrayStr) : undefined;
    let packListVal: PackList | undefined = packListStr
      ? JSON.parse(packListStr)
      : undefined;

    if (!songListVal) {
      import("./assets/songlist.json")
        .then(({ default: val }) => {
          setSongList(val);
          songListVal = val;
          localStorage.setItem(KEY_SONG_LIST, JSON.stringify(val));
        })
        .catch((err) => console.error(err));
    } else {
      setSongList(songListVal);
    }

    if (!searchArrayVal) {
      if (!songListVal) {
        import("./assets/songlist.json")
          .then(({ default: val }) => {
            const newSearchArray = generateSearchArray(val);
            localStorage.setItem(
              KEY_SEARCH_ARRAY,
              JSON.stringify(newSearchArray)
            );
            setSearchArray(newSearchArray);
          })
          .catch((err) => console.error(err));
      } else {
        const newSearchArray = generateSearchArray(songListVal);
        localStorage.setItem(KEY_SEARCH_ARRAY, JSON.stringify(newSearchArray));
        setSearchArray(newSearchArray);
      }
    } else {
      setSearchArray(searchArrayVal);
    }

    if (!packListVal) {
      import("./assets/packlist.json")
        .then(({ default: val }) => {
          packListVal = val;
          localStorage.setItem(KEY_PACK_LIST, JSON.stringify(val));
          setPackList(val);
        })
        .catch((e) => console.error(e));
    } else {
      setPackList(packListVal);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        searchArray,
        songList,
        packList,
        isWon,
        guess: (id) => {
          setPastGuesses((prev) => [...prev, { id }]);
          if (id === solution?.id) {
            setIsWon(true);
          }
        },
        newGame() {
          setPastGuesses([]);
          const songListKeyes = songList ? Object.keys(songList) : undefined;
          const newSong =
            songListKeyes && songList
              ? songList[
                  songListKeyes[
                    Math.floor(Math.random() * songListKeyes.length)
                  ]
                ]
              : undefined;
          console.log(newSong);
          setSolution(newSong);
          setIsWon(false);
        },
        pastGuesses,
        solution,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
