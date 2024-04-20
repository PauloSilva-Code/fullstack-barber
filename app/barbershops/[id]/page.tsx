import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import BarbershopInfo from "./_componens/barbershop-info";
import ServiceItem from "./_componens/service-item";

interface BarbershopDetailsPage {
  params: {
    id?: string;
  };
}

const BarbershopDetailsPage = async ({ params }: BarbershopDetailsPage) => {
  const session = await getServerSession(authOptions);

  if (!params.id) {
    // TODO: redirecionar para Home Page
    return null;
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    // TODO: redirecionar para Home Page
    return null;
  }

  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />

      <div className="px-5 py-6 flex flex-col gap-4">
        {barbershop.services.map((service) => (
          <ServiceItem
            key={service.id}
            barbershop={barbershop}
            service={service}
            isAuthenticated={!!session?.user}
          />
        ))}
      </div>
    </div>
  );
};

export default BarbershopDetailsPage;
