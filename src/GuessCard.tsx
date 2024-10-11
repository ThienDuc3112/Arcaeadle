import React from "react";
import CardBase from "./CardBase";

const GuessCard = ({ title }: { title: string }) => {
  return (
    <>
      <CardBase
        title={{ value: title }}
        difficulty={{ value: "12+" }}
        pack={{ value: "The xi update" }}
        version={{ value: "69.0" }}
      />
    </>
  );
};

export default GuessCard;
