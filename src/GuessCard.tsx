import React, { useContext } from "react";
import CardBase from "./CardBase";
import { AppContext } from "./context";

const GuessCard = ({ id }: { id: string }) => {
  const { songList } = useContext(AppContext);
  if (!songList) return <p>Error: Cannot list list of songs</p>;
  const song = songList[id];
  return (
    <>
      <CardBase
        title={{ value: id }}
        difficulty={{
          value: `${song.difficulties[2].rating}${
            song.difficulties[2].ratingPlus ? "+" : ""
          }`,
        }}
        pack={{ value: song.set }}
        version={{ value: song.version }}
      />
    </>
  );
};

export default GuessCard;
