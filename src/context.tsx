import { createContext, ReactNode, useEffect, useState } from "react";
import { generateSearchArray } from "./util";
import { SongList } from "./songlistType";

const KEY_SEARCH_ARRAY = "__cache_search_array";
const KEY_SONG_LIST = "__cache_song_list";

export const AppContext = createContext<{
  searchArray:
    | {
        search: string;
        id: string;
      }[]
    | undefined;
  songList: SongList | undefined;
}>({
  searchArray: [],
  songList: {},
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [songList, setSongList] = useState<SongList>();
  const [searchArray, setSearchArray] = useState<
    {
      search: string;
      id: string;
    }[]
  >();

  useEffect(() => {
    const songListStr = localStorage.getItem(KEY_SONG_LIST);
    let songListVal: SongList | undefined = undefined;

    if (!songListStr) {
      import("./assets/songlist.json")
        .then(({ default: val }) => {
          setSongList(val);
          songListVal = val;
        })
        .catch((err) => console.error(err));
    } else {
      songListVal = JSON.parse(songListStr);
      setSongList(songListVal);
    }

    const searchArrayStr = localStorage.getItem(KEY_SEARCH_ARRAY);

    if (!searchArrayStr) {
      if (!songListVal) return;
      const newSearchArray = generateSearchArray(songListVal);
      localStorage.setItem(KEY_SEARCH_ARRAY, JSON.stringify(newSearchArray));
      setSearchArray(newSearchArray);
    } else {
      setSearchArray(JSON.parse(searchArrayStr));
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        searchArray,
        songList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
