import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const id = params.userId;

  if (!id) {
    return {
      status: 400,
      body: {
        message: "Missing id",
      },
    };
  }

  const reservations = await prisma.tripReservation.findMany({
    where: { userId: id },
    include: {
      trip: true,
    },
  });

  return new NextResponse(JSON.stringify(reservations), { status: 200 });
}
