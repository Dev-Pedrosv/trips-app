import Button from "@/components/Button";
import Image from "next/image";
import React from "react";

interface TripLocationProps {
  location: string;
  locationDescription: string;
}

function TripLocation({ location, locationDescription }: TripLocationProps) {
  return (
    <div className="p-5 lg:p-0 lg:mt-12 lg:pb-20">
      <h2 className="font-semibold text-primaryDarker mb-5 lg:text-xl">
        Localização
      </h2>

      <div
        className="relative w-full h-[280px] lg:hidden"
        style={{ objectFit: "cover" }}
      >
        <Image
          src="/map-mobile.png"
          alt={location}
          fill
          className="rounded-lg shadow-md"
        />
      </div>

      <div
        className="hidden lg:block relative w-full h-[480px]"
        style={{ objectFit: "cover" }}
      >
        <Image
          src="/map-desktop.png"
          alt={location}
          fill
          className="rounded-lg shadow-md"
        />
      </div>

      <h3 className="text-sm font-semibold text-primaryDarker mt-3 lg:text-base lg:mt-5">
        {location}
      </h3>
      <p className="text-xs text-primaryDarker mt-3 leading-5 lg:text-sm lg:mt-4">
        {locationDescription}
      </p>
      <Button variant="outlined" className="w-full mt-5">
        Ver no Google Maps
      </Button>
    </div>
  );
}

export default TripLocation;
