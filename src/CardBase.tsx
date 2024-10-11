import React from "react";

const Box = ({
  text,
  image,
  correct,
}: {
  text: string;
  image?: string;
  correct?: boolean;
}) => {
  return (
    <div
      className={`${
        correct ? "bg-green-400" : "bg-red-500"
      } w-24 h-24 rounded-xl text-white flex justify-center items-center m-2 text-center`}
    >
      <b>
        {image ? (
          <img className="text-wrap rounded-xl" src={image} alt={text} />
        ) : (
          <p className="text-wrap m-1">{text}</p>
        )}
      </b>
    </div>
  );
};

type Value<T> = {
  value: T;
  correct?: boolean;
};

const CardBase = ({
  title,
  difficulty,
  pack,
  version,
}: {
  title: Value<string>;
  pack: Value<string>;
  version: Value<string>;
  difficulty: Value<string>;
}) => {
  return (
    <div className="flex w-2/5 justify-between mx-auto">
      <Box
        text={title.value}
        image={`https://raw.githubusercontent.com/ThienDuc3112/Arcaea-game-api/refs/heads/master/songjacket/${title.value}.jpg`}
        correct={title.correct}
      />
      <Box text={difficulty.value} correct={difficulty.correct} />
      <Box text={pack.value} correct={pack.correct} />
      <Box text={version.value} correct={version.correct} />
    </div>
  );
};

export default CardBase;
