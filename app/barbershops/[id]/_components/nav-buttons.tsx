"use client"

import { Button } from "@/app/_components/ui/button"
import ServiceItem from "./service-item"
import { Barbershop, Service } from "@prisma/client"
import { useState } from "react"
import { cn } from "@/app/_lib/utils"

interface NavButtonsProps {
    barbershop: {
        services: Service[]
    } & Barbershop;
    isAuthenticated?: boolean;
}

const NavButtons = ( {barbershop, isAuthenticated}: NavButtonsProps ) => {
    const [activeTab, setActiveTab] = useState<"services" | "info">("services")

    function changeTab(tab: "services" | "info") {
        setActiveTab(tab)
    }

    return (
        <div className="px-5 pt-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <Button variant={"outline"} className={cn(activeTab === 'services' ? 'bg-primary' : '')} onClick={() => changeTab('services')}>Serviços</Button>
                <Button variant={"outline"} className={cn(activeTab === 'info' ? 'bg-primary' : '')} onClick={() => changeTab('info')}>Informações</Button>
                <p>{isAuthenticated}</p>
            </div>
            {activeTab === 'services' ? barbershop.services.map(service => (
                <ServiceItem key={service.id} service={service} isAuthenticated={isAuthenticated} />
            )) : <span className="text-sm text-gray-400">Em breve!</span>}
        </div>
    )
}

export default NavButtons