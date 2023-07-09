import Image from "next/image";
import React from "react";

interface TripHighlightsProps {
  highlights: string[];
}

function TripHighlights({ highlights }: TripHighlightsProps) {
  return (
    <div className="flex flex-col p-5 lg:p-0 lg:mt-12">
      <h2 className="font-semibold text-primaryDarker mb-2 lg:text-xl">
        Destaques
      </h2>
      <div className="flex flex-wrap gap-y-3 lg:mt-5">
        {highlights.map((highlight) => (
          <div
            className="flex items-center gap-2 w-1/2 lg:gap-3"
            key={highlight}
          >
            <Image
              src="/check-icon.png"
              alt={highlight}
              width={15}
              height={15}
            />
            <p className="text-xs text-grayPrimary lg:text-base">{highlight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TripHighlights;
