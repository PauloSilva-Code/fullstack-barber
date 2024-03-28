import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import BookingItem from "../(home)/_components/booking-item";
import Header from "../(home)/_components/header";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { db } from "../lib/prisma";

const BookingPage = async () => {
  // recuperar a sessão do usuário(ver se ele está logado ou não)
  const session = await getServerSession(authOptions);

  // se ele não estiver logado, redirecionar para página de login
  if (!session) {
    return redirect("/");
  }

  /*
    pegando os agendamentos no banco(schema)
    criando duas query
  */
  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
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
    }),
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
  ]);

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">
          Confirmados
        </h2>

        <div className="flex flex-col gap-3">
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">
          Finalizados
        </h2>

        <div className="flex flex-col gap-3">
          {finishedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BookingPage;
