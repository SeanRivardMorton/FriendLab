"use client";

import React from "react";

interface SloganRotaterProps {
  slogans: string[];
  initialIndex?: number;
}

const SloganRotater: React.FC<SloganRotaterProps> = ({
  slogans,
  initialIndex = 0,
}) => {
  const [index, setIndex] = React.useState(initialIndex);
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (index === slogans.length - 1) {
        setIndex(0);
        return;
      }
      setIndex((i) => i + 1);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [index, slogans.length]);

  return (
    <div className="text-center">
      <h2
        style={{ wordSpacing: "100vw" }}
        className="text-4xl mx-auto underline"
      >
        {slogans[index]}
      </h2>
    </div>
  );
};

export default SloganRotater;
