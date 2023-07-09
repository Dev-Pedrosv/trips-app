import Button from "@/components/Button";
import { formatCurrency } from "@/lib/format-currency";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import React from "react";
import ReactCountryFlag from "react-country-flag";

interface UserReservationItemProps {
  reservation: Prisma.TripReservationGetPayload<{
    include: { trip: true };
  }>;
}

function UserReservationItem({ reservation }: UserReservationItemProps) {
  const { trip } = reservation;
  return (
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

      <div className="flex flex-col mt-5">
        <h3 className="text-sm text-primaryDarker">Data</h3>
        <div className="flex items-center gap-1 ">
          <p className="text-sm">
            {format(new Date(reservation.startDate), "dd  'de' MMMM", {
              locale: ptBR,
            })}
          </p>
          {" - "}
          <p className="text-sm">
            {format(new Date(reservation.endDate), "dd  'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <h3 className="text-sm text-primaryDarker mt-5">Hóspedes</h3>
        <p className="text-sm pb-5">{reservation.guests} hóspedes</p>
      </div>

      <h3 className="font-semibold text-primaryDarker mt-3 pt-5 border-t border-solid border-grayLighter">
        Informações sobre o preço
      </h3>
      <div className="flex justify-between mt-2">
        <p className="text-primaryDarker text-sm">Total:</p>
        <p className="font-medium text-sm">
          {formatCurrency(Number(reservation.totalPaid))}
        </p>
      </div>

      <Button variant="danger" className="mt-5">
        Cancelar
      </Button>
    </div>
  );
}

export default UserReservationItem;
