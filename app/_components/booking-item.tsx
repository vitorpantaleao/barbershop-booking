import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const BookingItem = () => {
    return (
        <div>
            <Card>
                <CardContent className="p-0">
                    <div className="flex justify-between">
                        <div className="flex flex-col items-start gap-2 p-5">
                            <Badge className="bg-[#221C30] text-primary hover:bg-[#221C30]">Confirmado</Badge>
                            <h2 className="font-bold">Corte de cabelo</h2>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src="https://avatars.githubusercontent.com/u/27984504?v=4" />
                                    <AvatarFallback>VH</AvatarFallback>
                                </Avatar>
                                <h3 className="text-sm">Vintage Barber</h3>
                            </div>
                        </div>
                        <div className="w-1/5 flex flex-col items-center justify-center border-l border-solid border-secondary p-5">
                            <p className="text-sm">Fevereiro</p>
                            <p className="text-3xl">06</p>
                            <p className="text-sm">14:00</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default BookingItem;