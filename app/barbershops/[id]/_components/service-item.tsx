import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Service } from "@prisma/client"
import Image from "next/image"

interface ServiceItemProps {
    service: Service
}

const ServiceItem = ({service}: ServiceItemProps) => {
    return (
        <Card>
            <CardContent className="p-3">
                <div className="flex items-center gap-4">
                    <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
                        <Image src={service.imageUrl} fill className="h-[159px] w-full object-cover rounded-lg" alt={service.name} />
                    </div>
                    <div className="flex-1">
                        <h2 className="font-bold">{service.name}</h2>
                        <p className="text-sm text-gray-400">{service.description}</p>

                        <div className="flex items-center justify-between mt-3">
                            <p className="text-primary text-sm font-bold">R$ {Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(service.price))}</p>
                            <Button variant={"secondary"}>Agendar</Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ServiceItem