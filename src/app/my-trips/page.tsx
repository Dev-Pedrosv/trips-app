"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import UserReservationItem from "./components/UserReservationItem";
import Link from "next/link";
import Button from "@/components/Button";

function MyTrips() {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true };
    }>[]
  >();
  const { status, data } = useSession();
  const router = useRouter();

  const fetchReservations = async () => {
    const response = await fetch(
      `http://localhost:3000/api/user/${(data?.user as any).id}/reservations`
    ).then((res) => res.json());

    setReservations(response);
    console.log(response);
  };

  useEffect(() => {
    if (status === "unauthenticated" || !data?.user) {
      return router.push("/");
    }

    fetchReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="font-semibold text-primaryDarker text-xl">
        Minhas Viagens
      </h1>
      {reservations && reservations?.length > 0 ? (
        reservations?.map((reservation) => (
          <UserReservationItem
            key={reservation.id}
            reservation={reservation}
            onSuccess={fetchReservations}
          />
        ))
      ) : (
        <div className="flex flex-col">
          <p className="text-primaryDarker font-medium mt-2">
            Você ainda nao tem nenhuma reserva :(
          </p>
          <Link href="/">
            <Button className="w-full mt-2">Fazer reserva</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default MyTrips;
