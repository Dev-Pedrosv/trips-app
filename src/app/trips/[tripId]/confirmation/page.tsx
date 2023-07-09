"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Trip } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ReactCountryFlag from "react-country-flag";

import Button from "@/components/Button";

function TripConfirmation({ params }: { params: { tripId: string } }) {
  const [trip, setTrip] = useState<Trip | null>();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const { status } = useSession();
  const router = useRouter();

  const searchParams = useSearchParams();
  const startDate = new Date(searchParams.get("startDate") as string);
  const endDate = new Date(searchParams.get("endDate") as string);
  const maxGuests = searchParams.get("maxGuests");

  useEffect(() => {
    const fetchTrip = async () => {
      const response = await fetch("http://localhost:3000/api/trips/check", {
        method: "POST",
        body: JSON.stringify({
          tripId: params.tripId,
          startDate: startDate,
          endDate: endDate,
          maxGuests: maxGuests,
        }),
      }).then((res) => res.json());

      if (response?.error === "TRIP_ALREADY_RESERVED") {
        return router.push("/");
      }

      setTrip(response.trip);
      setTotalPrice(response.totalPrice);
    };

    if (status === "unauthenticated") {
      router.push("/");
    }

    fetchTrip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (!trip) return null;

  return (
    <div className="container mx-auto p-5">
      <h1 className="font-semibold text-xl text-primaryDarker">Sua viagem</h1>
      <div className="flex flex-col p-5 mt-5 border-grayLighter border-solid border-spacing-2 shadow-lg rounded-lg">
        <div className="flex items-center gap-3 pb-5 border-b border-grayLighter border-solid">
          <div className="relative h-[106px] w-[124px]">
            <Image
              src={trip.coverImage}
              alt={trip.name}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl text-primaryDarker font-semibold ">
              {trip.name}
            </h2>
            <div className="flex items-center gap-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className="text-xs text-grayPrimary underline">
                {trip.location}
              </p>
            </div>
          </div>
        </div>

        <h3 className="font-semibold text-lg text-primaryDarker mt-3">
          Informações sobre o preço
        </h3>
        <div className="flex justify-between">
          <p className="text-primaryDarker">Total:</p>
          <p className="font-medium">{totalPrice}</p>
        </div>
      </div>

      <div className="flex flex-col mt-5">
        <h3 className="font-semibold text-primaryDarker">Data</h3>
        <div className="flex items-center gap-1 mt-1">
          <p>{format(startDate, "dd  'de' MMMM", { locale: ptBR })}</p>
          {" - "}
          <p>{format(endDate, "dd  'de' MMMM", { locale: ptBR })}</p>
        </div>

        <h3 className="font-semibold text-primaryDarker mt-5">Hóspedes</h3>
        <p>{maxGuests} hóspedes</p>

        <Button className="mt-5">Finalizar Compra</Button>
      </div>
    </div>
  );
}

export default TripConfirmation;