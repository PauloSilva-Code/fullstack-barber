import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { db } from "../lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import BookingItem from "./_components/booking-item";
import Header from "./_components/header";
import Search from "./_components/search";

export default async function Home() {
  // pegando o usuário autenticado
  const session = await getServerSession(authOptions);

  // pegando os barbeiros e os agendamentos do usuário logado(se ele estiver logado)
  const [barbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}),
    session?.user
      ? await db.booking.findMany({
          where: {
            userId: (session.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          include: {
            service: true,
            barbershop: true,
          },
        })
      : Promise.resolve([]),
  ]);

  return (
    <main>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">
          {session?.user
            ? `Olá, ${session.user.name?.split(" ")[0]}!`
            : "Olá, Vamos fazer uma reserva!"}
        </h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>

      {confirmedBookings.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xs pl-5  mb-3 uppercase text-gray-400 font-bold">
            Agendamentos
          </h2>

          <div className="flex gap-3 px-5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xs px-5 mb-3 uppercase text-gray-400 font-bold">
          Recomendados
        </h2>

        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className="mt-6 mb-[4.5rem]">
        <h2 className="text-xs px-5 mb-3 uppercase text-gray-400 font-bold">
          Populares
        </h2>

        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </main>
  );
}
