import TripItem from "@/components/TripItem";
import { Trip } from "@prisma/client";
import React from "react";

async function RecommendTrips() {
  const data = await fetch("http://localhost:3000/api/trips").then((response) =>
    response.json()
  );

  return (
    <div className="container mx-auto">
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-grayLighter"></div>
        <h2 className="px-5 font-medium text-grayPrimary whitespace-nowrap">
          Destinos Recomendados
        </h2>
        <div className="w-full h-[1px] bg-grayLighter"></div>
      </div>

      <div className="flex flex-col items-center mt-5 gap-5">
        {data.map((trip: Trip) => (
          <TripItem trip={trip} key={trip.id} />
        ))}
      </div>
    </div>
  );
}

export default RecommendTrips;
