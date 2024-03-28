import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent } from "@/app/components/ui/card";
import { Prisma } from "@prisma/client";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  return (
    <Card className="min-w-full">
      <CardContent className="py-0 flex px-0">
        <div className="flex flex-col gap-2 py-5 pl-5 flex-[3]">
          <Badge
            // Passamos as cores bg-[] hover:bg-[] para raiz do componente "Badge".
            variant={isPast(booking.date) ? "secondary" : "default"}
            className="w-fit"
          >
            {isPast(booking.date) ? "Finalizado" : "Confirmado"}
          </Badge>

          <h2 className="font-bold">{booking.service.name}</h2>

          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={booking.service.imageUrl} />

              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <h3 className="text-sm">{booking.barbershop.name}</h3>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 border-l border-solid border-secondary">
          <p className="text-sm capitalize">
            {format(booking.date, "MMMM", {
              locale: ptBR,
            })}
          </p>
          <p className="text-2xl">{format(booking.date, "dd")}</p>
          <p className="text-sm">{format(booking.date, "hh:mm")}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
