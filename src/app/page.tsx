import QuickSearch from "./components/QuickSearch";
import RecommendTrips from "./components/RecommendTrips";
import TripSearch from "./components/TripSearch";

export default function Home() {
  return (
    <div className="">
      <TripSearch />
      <QuickSearch />
      <RecommendTrips />
    </div>
  );
}
