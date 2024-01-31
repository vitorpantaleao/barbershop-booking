"use client"

import { Avatar, AvatarImage } from "./ui/avatar";
import { LogOutIcon, UserCircle, LogInIcon, HomeIcon, CalendarIcon } from "lucide-react"
import { Button } from "./ui/button"
import { SheetHeader, SheetTitle } from "./ui/sheet"
import { useSession, signOut, signIn } from "next-auth/react"
import Link from "next/link";

const SideMenu = () => {
    const {data} = useSession();
    const handleLogout = () => signOut();
    const handleLogin = () => signIn("google");
    
    return (
        <>
            <SheetHeader className="text-left border-b border-solid border-secondary p-5">
                <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            {data?.user ? (
                <div className="flex justify-between items-center px-5 py-6">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={data?.user?.image ?? ""} alt={data?.user?.name ?? ""} />
                        </Avatar>
                        <h2 className="font-bold">{data?.user?.name}</h2>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        <Button variant="secondary" size="icon" onClick={handleLogout}>
                            <LogOutIcon size={18} />
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="px-5 py-6 space-y-5">
                    <div className="flex items-center gap-2">
                        <UserCircle size={"32px"} />
                        <h2 className="font-bold">Olá, faça seu login!</h2>
                    </div>
                    <Button variant="secondary" className="w-full justify-start" onClick={handleLogin}>
                        <LogInIcon className="mr-2" size={18} />
                        Fazer Login
                    </Button>
                </div>
            )}

            <div className="flex flex-col gap-3 px-5">
                <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/">
                        <HomeIcon className="mr-2" size={18} />
                        Início
                    </Link>
                </Button>

                {data?.user && (
                    <Button variant="outline" className="w-full justify-start" asChild>
                        <Link href="/bookings">
                            <CalendarIcon className="mr-2" size={18} />
                            Agendamentos
                        </Link>
                    </Button>
                )}
            </div>
        </>
    )
}

export default SideMenu