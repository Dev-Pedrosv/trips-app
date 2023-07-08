import Image from "next/image";
import React from "react";

interface TripHighlightsProps {
  highlights: string[];
}

function TripHighlights({ highlights }: TripHighlightsProps) {
  return (
    <div className="flex flex-col p-5">
      <h2 className="font-semibold text-primaryDarker mb-2">Destaques</h2>
      <div className="flex flex-wrap gap-y-3">
        {highlights.map((highlight) => (
          <div className="flex items-center gap-2 w-1/2" key={highlight}>
            <Image
              src="/check-icon.png"
              alt={highlight}
              width={15}
              height={15}
            />
            <p className="text-xs text-grayPrimary">{highlight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TripHighlights;
