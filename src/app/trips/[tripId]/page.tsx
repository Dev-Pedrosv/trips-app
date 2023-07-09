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
    <div className="container mx-auto lg:px-40 lg:p-10">
      <TripHeader trip={trip} />
      <div className="flex flex-col lg:flex-row lg:mt-12 lg:gap-20">
        <div className="lg:order-2">
          <TripReservation
            tripId={trip.id}
            maxGuests={trip.maxGuests}
            tripEndDate={trip.endDate}
            tripStartDate={trip.startDate}
            pricePerDay={trip.pricePerDay as any}
          />
        </div>
        <div className="lg:order-1">
          <TripDescription description={trip.description} />
          <TripHighlights highlights={trip.highlights} />
        </div>
      </div>
      <TripLocation
        location={trip.location}
        locationDescription={trip.description}
      />
    </div>
  );
}

export default TripsDetails;
