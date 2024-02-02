import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true;
            barbershop: true;
        }
    }>;
}

const BookingItem = ({booking}: BookingItemProps) => {
    const isBookingConfirmed = isFuture(booking.date);

    return (
        <div>
            <Card>
                <CardContent className="p-0">
                    <div className="flex justify-between">
                        <div className="flex flex-col items-start gap-2 p-5">
                            <Badge variant={isBookingConfirmed ? "default" : "secondary"}>
                                {isBookingConfirmed ? "Confirmado" : "Finalizado"}
                            </Badge>
                            <h2 className="font-bold">{booking.service.name}</h2>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={booking.barbershop.imageUrl} />
                                    <AvatarFallback>{booking.barbershop.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <h3 className="text-sm">{booking.barbershop.name}</h3>
                            </div>
                        </div>
                        <div className="w-1/5 flex flex-col items-center justify-center border-l border-solid border-secondary p-5">
                            <p className="text-sm capitalize">{format(booking.date, "MMMM", {
                                locale: ptBR,
                            })}</p>
                            <p className="text-3xl">{format(booking.date, "dd")}</p>
                            <p className="text-sm">{format(booking.date, "hh:mm")}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default BookingItem;