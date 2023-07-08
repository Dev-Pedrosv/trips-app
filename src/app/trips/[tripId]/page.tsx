import { prisma } from "@/lib/prisma";
import React from "react";
import TripReservation from "./components/TripReservation";
import TripHeader from "./components/TripHeader";
import TripDescription from "./components/TripDescription";

const getTripDetails = async (tripId: string) => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });

  return trip;
};

async function TripsDetails({ params }: { params: { tripId: string } }) {
  const trip = await getTripDetails(params.tripId);

  if (!trip) return null;

  return (
    <div className="container mx-auto">
      <TripHeader trip={trip} />
      <TripReservation trip={trip} />
      <TripDescription description={trip.description} />
    </div>
  );
}

export default TripsDetails;
