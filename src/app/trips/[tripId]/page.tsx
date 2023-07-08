import { prisma } from "@/lib/prisma";
import React from "react";
import TripReservation from "./components/TripReservation";
import TripHeader from "./components/TripHeader";
import TripDescription from "./components/TripDescription";
import TripHighlights from "./components/TripHighlights";
import TripLocation from "./components/TripLocation";

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
      <TripReservation
        tripId={trip.id}
        maxGuests={trip.maxGuests}
        tripEndDate={trip.endDate}
        tripStartDate={trip.startDate}
        pricePerDay={trip.pricePerDay as any}
      />
      <TripDescription description={trip.description} />
      <TripHighlights highlights={trip.highlights} />
      <TripLocation
        location={trip.location}
        locationDescription={trip.description}
      />
    </div>
  );
}

export default TripsDetails;
