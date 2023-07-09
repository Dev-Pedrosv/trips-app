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
      `/api/user/${(data?.user as any)?.id}/reservations`
    ).then((res) => res.json());

    setReservations(response);
    console.log(response);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/");
    }

    fetchReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="font-semibold text-primaryDarker text-xl lg:mb-5">
        Minhas Viagens
      </h1>
      {reservations && reservations?.length > 0 ? (
        <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-14">
          {reservations?.map((reservation) => (
            <UserReservationItem
              key={reservation.id}
              reservation={reservation}
              onSuccess={fetchReservations}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col lg:max-w-[300px] lg:mx-auto">
          <p className="text-primaryDarker font-medium mt-2 lg:text-center lg:mt-20">
            Você ainda nao tem nenhuma reserva :(
          </p>
          <Link href="/">
            <Button className="w-full mt-2 lg:mt-10">Fazer reserva</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default MyTrips;
