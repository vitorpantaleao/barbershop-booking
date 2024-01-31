import { db } from "@/app/_lib/prisma"
import BarbershopInfo from "./_components/barbershop-info"
import NavButtons from "./_components/nav-buttons"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

interface BarbershopDetailsPageProps {
    params: {
        id?: string
    }
}

const BarbershopDetailsPage = async ( {params}: BarbershopDetailsPageProps ) => {
    const session = await getServerSession(authOptions)

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
            <NavButtons barbershop={barbershop} isAuthenticated={!!session?.user} />
        </div>
    )
}

export default BarbershopDetailsPage