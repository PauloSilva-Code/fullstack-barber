"use client";

import { Avatar, AvatarImage } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { SheetHeader } from "@/app/components/ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  CalendarIcon,
  CircleUserRoundIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
} from "lucide-react";

const SideMenu = () => {
  const { data } = useSession();

  const handleLoginClick = () => signIn("google");

  const handleLogoutClick = () => signOut();

  return (
    <>
      <SheetHeader className="text-left border-b border-solid border-secondary p-5">
        <h1>Menu</h1>
      </SheetHeader>

      {data?.user ? (
        <div className="flex justify-between items-center px-5 py-6">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={data.user?.image ?? ""} />
            </Avatar>

            <h2 className="font-bold">{data.user.name}</h2>
          </div>
          <Button variant="secondary" size="icon">
            <LogOutIcon onClick={handleLogoutClick} size={20} />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 px-5 py-6">
          <div className="flex items-center gap-2">
            <CircleUserRoundIcon size={32} />
            <h2 className="font-bold">Olá. Faça seu login!</h2>
          </div>

          <Button
            className="w-full justify-start"
            variant="secondary"
            onClick={handleLoginClick}
          >
            <LogInIcon className="mr-2" size={18} />
            Fazer Login
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-3 px-5">
        <Button variant="outline" className="justify-start" asChild>
          <Link href="/">
            <HomeIcon size={18} className="mr-2" />
            Início
          </Link>
        </Button>

        {data?.user && (
          <Button variant="outline" className="justify-start" asChild>
            <Link href="/bookings">
              <CalendarIcon size={18} className="mr-2" />
              Agendamentos
            </Link>
          </Button>
        )}
      </div>
    </>
  );
};

export default SideMenu;
