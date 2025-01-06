"use client'"

import { type Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";

export const Header = ({ sessionData }: HeaderProps) => {

  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1 pl-5 text-3xl font-bold">
        {sessionData?.user?.name ? `Notes for ${sessionData.user.name}` : ""}
      </div>
    </div>
  )
}

interface HeaderProps {
  sessionData: Session | null;
}