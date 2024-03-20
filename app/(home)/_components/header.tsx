"use client";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { signIn } from "next-auth/react";

const Header = () => {
  const handleLoginClick = async () => {
    await signIn();
  };

  return (
    <Card>
      <CardContent className="p-5 justify-between items-center flex flex-row">
        <Image src="/logo.svg" alt="FSW Barber" height={18} width={120} />

        {/* <Button variant="outline" size="icon" className="h-8 w-8">
          <MenuIcon size={16} />
        </Button> */}

        <Button onClick={handleLoginClick}>Login</Button>
      </CardContent>
    </Card>
  );
};

export default Header;
