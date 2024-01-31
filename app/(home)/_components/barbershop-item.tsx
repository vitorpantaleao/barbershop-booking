"use client";

import { Button } from "@/app/_components/ui/button"
import { Badge } from "@/app/_components/ui/badge"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Barbershop } from "@prisma/client"
import { StarIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface BarbershopItemProps {
    barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
    const router = useRouter()
    const handleBookingClick = () => {
        router.push(`/barbershops/${barbershop.id}`)
    }

    return (
        <Card className="min-w-[167px] max-w-[167px] md:min-w-[220px] md:max-w-[220px] rounded-2xl">
            <CardContent className="p-0">
                <div className="p-1 relative">
                    <Badge className="absolute top-2 left-2 z-50 flex items-center gap-1 opacity-90" variant={"secondary"}>
                        <StarIcon className="fill-primary text-primary" size={16} /> 
                        <span className="text-xs">5,0</span>
                    </Badge>
                    <Image src={barbershop.imageUrl} height={0} width={0} sizes="100vw" className="h-[159px] w-full object-cover rounded-2xl" alt={barbershop.name} />
                </div>
                <div className="px-3 pb-3">
                    <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">{barbershop.name}</h2>
                    <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">{barbershop.address}</p>
                    <Button className="w-full mt-3 rounded-lg" variant={"secondary"} onClick={handleBookingClick}>Reservar</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default BarbershopItem