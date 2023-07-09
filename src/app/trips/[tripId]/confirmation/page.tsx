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
import { toast } from "react-toastify";
import { formatCurrency } from "@/lib/format-currency";
import { loadStripe } from "@stripe/stripe-js";

function TripConfirmation({ params }: { params: { tripId: string } }) {
  const [trip, setTrip] = useState<Trip | null>();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const { status } = useSession();
  const router = useRouter();

  const searchParams = useSearchParams();
  const startDate = new Date(searchParams.get("startDate") as string);
  const endDate = new Date(searchParams.get("endDate") as string);
  const guests = searchParams.get("guests");

  useEffect(() => {
    const fetchTrip = async () => {
      const response = await fetch("/api/trips/check", {
        method: "POST",
        body: JSON.stringify({
          tripId: params.tripId,
          startDate: startDate,
          endDate: endDate,
          maxGuests: guests,
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

  const handleBuyClick = async () => {
    const res = await fetch("/api/payment", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          tripId: params.tripId,
          startDate,
          endDate,
          guests: Number(guests),
          totalPrice,
          coverImage: trip.coverImage,
          name: trip.name,
          description: trip.description,
        })
      ),
    });

    if (!res.ok) {
      return toast.error("Ocorreu um erro ao realizar a reserva!", {
        position: "bottom-center",
      });
    }
    const { sessionId } = await res.json();

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_KEY as string
    );

    await stripe?.redirectToCheckout({ sessionId });

    // router.push("/my-trips");

    toast.success("Reserva realizada com sucesso!", {
      position: "bottom-center",
    });
  };

  return (
    <div className="container mx-auto p-5 lg:max-w-[600px]">
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
          <p className="font-medium">{formatCurrency(totalPrice)}</p>
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
        <p>{guests} hóspedes</p>

        <Button className="mt-5" onClick={handleBuyClick}>
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
}

export default TripConfirmation;
