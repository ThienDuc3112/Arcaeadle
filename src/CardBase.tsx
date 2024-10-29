const Box = ({
  text,
  image,
  isCorrect,
  isHigher,
}: {
  text: string;
  image?: string;
  isCorrect?: boolean;
  isHigher?: boolean;
}) => {
  const getArrow = () => {
    if (isCorrect || isHigher === undefined) return null;
    return !isHigher ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute opacity-30 text-white w-20 h-20"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute opacity-30 text-white w-20 h-20"
      >
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    );
  };
  return (
    <div
      className={`${
        isCorrect ? "bg-green-400" : "bg-red-500"
      } w-32 h-32 rounded-xl text-white flex justify-center items-center m-2 text-center`}
    >
      {getArrow()}
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
  image?: string;
  isHigher?: boolean;
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
      <Box text={title.value} image={title.image} isCorrect={title.correct} />
      <Box
        text={difficulty.value}
        isCorrect={difficulty.correct}
        isHigher={difficulty.isHigher}
      />
      <Box text={pack.value} isCorrect={pack.correct} />
      <Box
        text={version.value}
        isCorrect={version.correct}
        isHigher={version.isHigher}
      />
    </div>
  );
};

export default CardBase;
