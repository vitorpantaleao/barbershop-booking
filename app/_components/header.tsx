import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
    return (
        <Card>
            <CardContent className="flex justify-between items-center py-6 px-5">
                <Image src="/logo.png" alt="logo" width={120} height={22} />
                <Button variant="outline" size="icon" className="h-8 w-8">
                    <MenuIcon size={18} />
                </Button>
            </CardContent>
        </Card>
    )
}

export default Header;
