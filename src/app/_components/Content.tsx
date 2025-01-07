"use client"

import { api } from "~/trpc/react";
import { Session } from "next-auth";

export const Content = ({ sessionData }: ContentProps) => {
  const [topics] = api.topic.getAll.useSuspenseQuery();


  return <div>{JSON.stringify(topics)}</div>
}

interface ContentProps {

  sessionData: Session | null;
}