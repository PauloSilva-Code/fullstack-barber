"use server";

import { db } from "@/app/lib/prisma";

interface SaveBookingParams {
  barbershopId: string;
  serviceId: string;
  userId: string;
  date: Date;
}

export const SaveBooking = async (params: SaveBookingParams) => {
  // chamando nosso banco de dados "db" e pegando o bookings.
  // no booking criamos uma data seguindo os modelos da interface
  await db.booking.create({
    data: {
      barbershopId: params.barbershopId,
      serviceId: params.serviceId,
      userId: params.userId,
      date: params.date,
    },
  });
};

export default SaveBooking;
