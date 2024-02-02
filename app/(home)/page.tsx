import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import BarbershopItem from "./_components/barbershop-item";
import { db } from "../_lib/prisma";
import Header from "../_components/header";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
    const session = await getServerSession(authOptions);

    const [barbershops, confirmedBookings] = await Promise.all([
        db.barbershop.findMany({}),
        session?.user ? db.booking.findMany({
            where: {
                userId: (session.user as any).id,
                date: {
                    gte: new Date()
                }
            },
            include: {
                service: true,
                barbershop: true
            }
        }) : Promise.resolve([])
    ]);
    
    return (
        <div>
            <Header />
            <div className="px-5 pt-5">
                <h2 className="text-xl font-bold">Olá, Vitor!</h2>
                <p className="capitalize text-sm">
                    {format(new Date(), "EEEE',' dd 'de' MMMM", {
                        locale: ptBR,
                    })}
                </p>
            </div>
            <div className="px-5 mt-6">
                <Search />
            </div>
            <div className="px-5 mt-6">
                <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Agendamentos</h2>
                <div className="space-y-3">
                    {confirmedBookings.map((booking) => (
                        <BookingItem booking={booking} key={booking.id} />
                    ))}
                </div>
            </div>
            <div className="mt-6">
                <h2 className="px-5 text-xs uppercase text-gray-400 font-bold mb-3">Recomendados</h2>
                <div className="px-5 flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                    {barbershops.map((barbershop) => (
                        <BarbershopItem barbershop={barbershop} key={barbershop.id} />
                    ))}
                </div>
            </div>
            <div className="mt-6">
                <h2 className="px-5 text-xs uppercase text-gray-400 font-bold mb-3">Populares</h2>
                <div className="px-5 flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                    {barbershops.map((barbershop) => (
                        <BarbershopItem barbershop={barbershop} key={barbershop.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}
