import Button from "@/components/Button";
import Image from "next/image";
import React from "react";

interface TripLocationProps {
  location: string;
  locationDescription: string;
}

function TripLocation({ location, locationDescription }: TripLocationProps) {
  return (
    <div className="p-5">
      <h2 className="font-semibold text-primaryDarker mb-5">Localização</h2>

      <div className="relative w-full h-[280px]" style={{ objectFit: "cover" }}>
        <Image
          src="/map-mobile.png"
          alt={location}
          fill
          className="rounded-lg shadow-md"
        />
      </div>

      <h3 className="text-sm font-semibold text-primaryDarker mt-3">
        {location}
      </h3>
      <p className="text-xs text-primaryDarker mt-3 leading-5">
        {locationDescription}
      </p>
      <Button variant="outlined" className="w-full mt-5">
        Ver no Google Maps
      </Button>
    </div>
  );
}

export default TripLocation;
