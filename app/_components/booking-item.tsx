import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";

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
            <Sheet>
                <SheetTrigger asChild>
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
                </SheetTrigger>
                <SheetContent className="p-0">
                    <SheetHeader className="text-left border-b border-solid border-secondary px-5 py-6">
                        <SheetTitle>Detalhes do agendamento</SheetTitle>
                    </SheetHeader>
                    <div className="px-5">
                        <div className="relative h-[180px] w-full mt-6">
                            <Image src="/barbershop-map.png" fill className="object-cover rounded-xl" alt={booking.barbershop.name} />

                            <div className="w-full flex justify-center">
                                <Card className="w-5/6 mx-auto absolute bottom-4">
                                    <CardContent className="flex items-center gap-3 p-5">
                                        <Avatar>
                                            <AvatarImage src={booking.barbershop.imageUrl} />
                                        </Avatar>
                                        <div>
                                            <h2 className="font-bold">{booking.barbershop.name}</h2>
                                            <p className="text-xs">{booking.barbershop.address}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <div className="py-6 space-y-3">
                            <Badge variant={isBookingConfirmed ? "default" : "secondary"}>
                                {isBookingConfirmed ? "Confirmado" : "Finalizado"}
                            </Badge>

                            <Card>
                                <CardContent className="p-3 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <h2 className="font-bold">{booking.service.name}</h2>
                                        <h3 className="font-bold text-sm">{Intl.NumberFormat('pt-BR', { style: "currency", currency: "BRL" }).format(Number(booking.service.price))}</h3>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-gray-400 text-sm">Data</h3>
                                        <h4 className="text-sm">{format(booking.date, "dd 'de' MMMM", {
                                            locale: ptBR
                                        })}</h4>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-gray-400 text-sm">Horário</h3>
                                        <h4 className="text-sm">{format(booking.date, "hh:mm")}</h4>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-gray-400 text-sm">Barbearia</h3>
                                        <h4 className="text-sm">{booking.barbershop.name}</h4>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <SheetFooter className="flex-row gap-3">
                            <SheetClose asChild>
                                <Button variant={"secondary"} className="w-full font-bold">Voltar</Button>
                            </SheetClose>
                            <Button variant={"destructive"} disabled={!isBookingConfirmed} className="w-full">Cancelar agendamento</Button>
                        </SheetFooter>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default BookingItem;