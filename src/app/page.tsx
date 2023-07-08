import { prisma } from "@/lib/prisma";

const getTrips = async () => {
  const trips = await prisma.trip.findMany({});

  return trips;
};

export default async function Home() {
  const data = await getTrips();
  console.log(data);

  return <h1>Home page</h1>;
}
