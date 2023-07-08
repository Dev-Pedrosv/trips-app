import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <div className="bg-walterWhite p-5 flex justify-center flex-col items-center">
      <Image src="/logo.svg" alt="logo" width={133} height={33} />
      <p className="mt-1 text-sm text-primaryDarker font-medium">
        Todos os direitos reservados.
      </p>
    </div>
  );
}

export default Footer;
