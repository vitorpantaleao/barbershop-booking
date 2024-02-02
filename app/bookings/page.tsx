import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";

export default async function BookingsPage() {
    const session = await getServerSession(authOptions);

    if(!session?.user) return redirect("/");

    const [confirmedBookings, finishedBookings] = await Promise.all([
        db.booking.findMany({
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
        }),

        db.booking.findMany({
            where: {
                userId: (session.user as any).id,
                date: {
                    lt: new Date()
                }
            },
            include: {
                service: true,
                barbershop: true
            }
        })
    ]);

    return (
        <>
            <Header />

            <div className="px-5 py-6">
                <h1 className="text-xl font-bold">Agendamentos</h1>

                {confirmedBookings.length === 0 && finishedBookings.length === 0 ? (
                    <div className="p-6 bg-card rounded-lg shadow-lg mt-6">
                        <p className="text-center text-gray-400">Você ainda não tem agendamentos</p>
                    </div>
                ) : 
                    <>
                        {confirmedBookings.length > 0 && (
                            <>
                                <h2 className="text-sm uppercase text-gray-400 font-bold mt-6 mb-3">Confirmados</h2>
                                <div className="space-y-3">
                                    {confirmedBookings.map((booking) => (
                                        <BookingItem key={booking.id} booking={booking} />
                                    ))}                
                                </div>
                            </>
                        )}

                        {finishedBookings.length > 0 && (
                            <>
                                <h2 className="text-sm uppercase text-gray-400 font-bold mt-6 mb-3">Finalizados</h2>
                                <div className="space-y-3">
                                    {finishedBookings.map((booking) => (
                                        <BookingItem key={booking.id} booking={booking} />
                                    ))}                
                                </div>
                            </>
                        )}
                    </>
                }


            </div>
        </>
    );
}