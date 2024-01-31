import { db } from "@/app/_lib/prisma"
import BarbershopInfo from "./_components/barbershop-info"

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
        }
    })
    
    if(!barbershop) return null
    // TODO: redirecionar para página de erro caso não encontre a barbearia

    return (
        <div>
            <BarbershopInfo barbershop={barbershop} />
        </div>
    )
}

export default BarbershopDetailsPage