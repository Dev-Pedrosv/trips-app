import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  _request: Request,
  { params }: { params: { reservationId: string } }
) {
  const reservationId = params.reservationId;

  if (!reservationId) {
    return {
      status: 400,
      body: {
        message: "Missing reservation Id",
      },
    };
  }

  const reservations = await prisma.tripReservation.delete({
    where: { id: reservationId },
  });

  return new NextResponse(JSON.stringify(reservations), { status: 200 });
}
