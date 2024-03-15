"use client";

import { Button } from "@/app/components/ui/button";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopInfoPros {
  barbershop: Barbershop;
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoPros) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <main>
      <div className="h-[250px] w-full relative">
        <Button
          size="icon"
          variant="outline"
          className="z-50 absolute top-4 left-4"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon />
        </Button>

        <Button
          size="icon"
          variant="outline"
          className="z-50 absolute top-4 right-4"
        >
          <MenuIcon />
        </Button>

        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          // style={{
          //   objectFit: "cover",
          // }}
          sizes="100vw"
          className="opacity-85"
        />
      </div>

      <div className="px-5 py-3 pb-6 border-b border-solid border-secondary">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>
        <div className="flex items-center gap-1 mt-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>

        <div className="flex items-center gap-1 mt-2">
          <StarIcon className="fill-primary text-primary" size={18} />
          <span className="text-sm">5,0 (899 avaliações)</span>
        </div>
      </div>
    </main>
  );
};

export default BarbershopInfo;
