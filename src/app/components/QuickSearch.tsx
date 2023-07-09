import Image from "next/image";
import Link from "next/link";
import React from "react";

function QuickSearch() {
  return (
    <div className="container mx-auto p-5 ">
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-grayLighter"></div>
        <h2 className="px-5 font-medium text-grayPrimary whitespace-nowrap">
          Tente pesquisar por
        </h2>
        <div className="w-full h-[1px] bg-grayLighter"></div>
      </div>

      <div className="flex w-full justify-evenly mt-5 lg:mt-10">
        <Link href={"/trips/search?text=hotel"}>
          <div className="flex flex-col items-center gap-1">
            <Image
              width={35}
              height={35}
              src="/hotel-icon.png"
              alt="hotel icon"
            />
            <p className="text-sm text-grayPrimary lg:text-base">Hotel</p>
          </div>
        </Link>

        <Link href={"/trips/search?text=fazenda"}>
          <div className="flex flex-col items-center gap-1">
            <Image
              width={35}
              height={35}
              src="/farm-icon.png"
              alt="farm icon"
            />
            <p className="text-sm text-grayPrimary lg:text-base">Fazenda</p>
          </div>
        </Link>

        <Link href={"/trips/search?text=chalé"}>
          <div className="flex flex-col items-center gap-1">
            <Image
              width={35}
              height={35}
              src="/cottage-icon.png"
              alt="cottage icon"
            />
            <p className="text-sm text-grayPrimary lg:text-base">Chalé</p>
          </div>
        </Link>

        <Link href={"/trips/search?text=pousada"}>
          <div className="flex flex-col items-center gap-1">
            <Image width={35} height={35} src="/inn-icon.png" alt="inn icon" />
            <p className="text-sm text-grayPrimary lg:text-base">Pousada</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default QuickSearch;
