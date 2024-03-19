"use client";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Barbershop } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  const router = useRouter();

  const handleReserveClick = () => {
    router.push(`/barbershops/${barbershop.id}`);
  };

  return (
    <div>
      <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
        <CardContent className="px-1 py-0">
          <div className="w-full h-[159px] relative">
            <div className="absolute top-2 left-2 z-50">
              <Badge
                className="flex gap-1 items-center opacity-90"
                variant="secondary"
              >
                <StarIcon size={12} className="fill-primary text-primary" />
                <span className="text-xs">5,0</span>
              </Badge>
            </div>

            <Image
              src={barbershop.imageUrl}
              alt={barbershop.name}
              style={{
                objectFit: "cover",
              }}
              fill
              width={0}
              height={0}
              sizes="100vw"
              className="rounded-2xl"
            />
          </div>

          <div className="px-2 pb-3">
            <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">
              {barbershop.name}
            </h2>
            <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">
              {barbershop.address}
            </p>
            <Button
              className="w-full mt-3"
              variant="secondary"
              onClick={handleReserveClick}
            >
              Reservar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BarbershopItem;
