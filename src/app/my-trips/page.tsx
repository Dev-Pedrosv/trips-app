"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TripReservation } from "@prisma/client";

function MyTrips() {
  const [reservations, setReservations] = useState<TripReservation[]>();
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || !data?.user) {
      return router.push("/");
    }

    const fetchReservations = async () => {
      const response = await fetch(
        `http://localhost:3000/api/user/${(data?.user as any).id}/reservations`
      ).then((res) => res.json());

      setReservations(response);
      console.log(response);
    };

    fetchReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return <div>MyTrips</div>;
}

export default MyTrips;
