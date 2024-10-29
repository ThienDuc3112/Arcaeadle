import { useCallback, useContext } from "react";
import CardBase from "./CardBase";
import { AppContext } from "./context";
import {
  compareDifficulty as compareDifficultyNonMemo,
  compareVersion as compareVersionNonMemo,
} from "./util";

const GuessCard = ({ id }: { id: string }) => {
  const { songList, packList, solution } = useContext(AppContext);
  const compareDifficulty = useCallback(compareDifficultyNonMemo, []);
  const compareVersion = useCallback(compareVersionNonMemo, []);
  if (!solution) return <p>Error: No existing game found</p>;
  if (!songList) return <p>Error: Cannot list of songs</p>;
  if (!packList) return <p>Error: Cannot pack lists</p>;
  const song = songList[id];

  return (
    <>
      <CardBase
        title={{
          value: song.title_localized.en,
          correct: song.id === solution.id,
          image: `https://raw.githubusercontent.com/ThienDuc3112/Arcaea-game-api/refs/heads/master/songjacket/${song.id}.jpg`,
        }}
        difficulty={{
          value: `${song.difficulties[2].rating}${
            song.difficulties[2].ratingPlus ? "+" : ""
          }`,
          correct: compareDifficulty(song, solution) === 0,
          isHigher: compareDifficulty(song, solution) === 1,
        }}
        pack={{
          value: packList[song.set]
            ? packList[song.set].name_localized.en
            : "Memory Archive",
          correct: solution.set === song.set,
        }}
        version={{
          value: song.version,
          correct: compareVersion(song, solution) === 0,
          isHigher: compareVersion(song, solution) === 1,
        }}
      />
    </>
  );
};

export default GuessCard;
