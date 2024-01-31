import { db } from "@/app/_lib/prisma"
import BarbershopInfo from "./_components/barbershop-info"
import ServiceItem from "./_components/service-item"
import { Button } from "@/app/_components/ui/button"
import NavButtons from "./_components/nav-buttons"

interface BarbershopDetailsPageProps {
    params: {
        id?: string
    }
}

const BarbershopDetailsPage = async ( {params}: BarbershopDetailsPageProps ) => {
    if(!params.id) return null
    // TODO: redirecionar para página de erro caso não encontre a barbearia

    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id
        },
        include: {
            services: true
        }
    })
    
    if(!barbershop) return null
    // TODO: redirecionar para página de erro caso não encontre a barbearia

    return (
        <div>
            <BarbershopInfo barbershop={barbershop} />
            <NavButtons barbershop={barbershop} />
        </div>
    )
}

export default BarbershopDetailsPage