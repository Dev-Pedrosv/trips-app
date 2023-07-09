"use client";

import TripItem from "@/components/TripItem";
import { Trip } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function TripsSearch() {
  const [trips, setTrips] = useState<Trip[]>();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetch(
        `/api/trips/search?text=${searchParams.get(
          "text"
        )}&startDate=${searchParams.get("startDate")}&budget=${searchParams.get(
          "budget"
        )}`
      ).then((res) => res.json());

      setTrips(response);
    };

    fetchTrips();
  }, []);

  return (
    <div className="container mx-auto flex flex-col p-5 items-center">
      <h1 className="text-primaryDarker font-semibold text-xl">
        Viagens encontradas
      </h1>
      <h2 className="text-grayLighter font-medium mb-5">
        {trips && trips?.length > 0
          ? "Listamos as melhores viagens para você!"
          : "Não encontramos nenhuma viagem"}
      </h2>
      <div className="flex flex-col gap-4">
        {trips?.map((trip) => (
          <TripItem trip={trip} key={trip.id} />
        ))}
      </div>
    </div>
  );
}

export default TripsSearch;
