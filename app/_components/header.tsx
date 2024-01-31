"use client"

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, UserCircle } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";

const Header = () => {
    const {data, status} = useSession();
    const handleLogout = () => signOut();
    const handleLogin = () => signIn("google");

    return (
        <Card>
            <CardContent className="flex justify-between items-center py-6 px-5">
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={120} height={22} />
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                            <MenuIcon size={18} />
                        </Button>
                    </SheetTrigger>

                    <SheetContent className="p-0">
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
                    </SheetContent>
                </Sheet>
            </CardContent>
        </Card>
    )
}

export default Header;
