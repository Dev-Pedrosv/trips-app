import TripItem from "@/components/TripItem";
import { prisma } from "@/lib/prisma";
import { Trip } from "@prisma/client";
import React from "react";

async function getTrips() {
  const trips = await prisma.trip.findMany();
  return trips;
}

async function RecommendTrips() {
  const data = await getTrips();

  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-grayLighter"></div>
        <h2 className="px-5 font-medium text-grayPrimary whitespace-nowrap">
          Destinos Recomendados
        </h2>
        <div className="w-full h-[1px] bg-grayLighter"></div>
      </div>

      <div className="flex flex-col items-center mt-5 gap-5 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-10 lg:mt-12">
        {data.map((trip: Trip) => (
          <TripItem trip={trip} key={trip.id} />
        ))}
      </div>
    </div>
  );
}

export default RecommendTrips;
