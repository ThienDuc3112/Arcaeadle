import { Searchtitle, SongList, Titlelocalized } from "./songlistType";

export const generateSearchArray = (
  songList: SongList
): { search: string; id: string }[] => {
  const res: { search: string; id: string }[] = [];

  for (const key in songList) {
    const song = songList[key];

    // id
    res.push({
      search: song.id,
      id: song.id,
    });

    // localized title
    for (const language in song.title_localized) {
      res.push({
        search: song.title_localized[language as keyof Titlelocalized]!,
        id: song.id,
      });
    }

    // search title
    if (song.search_title) {
      for (const language in song.search_title) {
        const searchTerms = song.search_title[language as keyof Searchtitle]!;
        searchTerms.forEach((term) => {
          res.push({ search: term, id: song.id });
        });
      }
    }
  }

  return res;
};
