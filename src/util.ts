import { Searchtitle, Song, SongList, Titlelocalized } from "./type";

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

export const compareDifficulty = (song1: Song, song2: Song): -1 | 0 | 1 => {
  const diff1 = song1.difficulties[2];
  const diff2 = song2.difficulties[2];
  console.log(
    "comparing: ",
    `${diff1.rating}${diff1.ratingPlus ? "+" : ""}`,
    `${diff2.rating}${diff2.ratingPlus ? "+" : ""}`
  );
  if (diff1.rating === diff2.rating && diff1.ratingPlus === diff2.ratingPlus) {
    return 0;
  }
  if (
    diff1.rating < diff2.rating ||
    (diff1.rating === diff2.rating && !diff1.ratingPlus && diff2.ratingPlus)
  ) {
    return -1;
  }
  return 1;
};

export const compareVersion = (song1: Song, song2: Song): -1 | 0 | 1 => {
  const ver1 = song1.version;
  const ver2 = song2.version;
  console.log("Comparing: ", ver1, ver2);
  const [major1, minor1] = ver1.split(".").map(Number);
  const [major2, minor2] = ver2.split(".").map(Number);

  if (major1 > major2) return 1;
  if (major1 < major2) return -1;

  if (minor1 > minor2) return 1;
  if (minor1 < minor2) return -1;

  return 0;
};
