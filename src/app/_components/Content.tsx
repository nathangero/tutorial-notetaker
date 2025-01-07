"use client"

import { api, type RouterOutputs } from "~/trpc/react";
import { type Session } from "next-auth";
import { useState } from "react";
import { NoteEditor } from "./NoteEditor";

type Topic = RouterOutputs["topic"]["getAll"][0];

export const Content = ({ sessionData }: ContentProps) => {
  const [topics] = api.topic.getAll.useSuspenseQuery();
  const [newTopic, setNewTopic] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);


  const utils = api.useUtils();

  const createTopic = api.topic.create.useMutation({
    onSuccess: async () => {
      await utils.topic.invalidate();
      setNewTopic("");
    }
  });

  return (
    <div className="mx-5 mt-5 grid grid-cols-4 gap-2">
      <div className="px-2">
        <ul className="menu rounded-box w-56 bg-base-100 p-2">
          {topics?.map((topic) => (
            <li key={topic.id}>
              <a
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  setSelectedTopic(topic);
                }}
              >{topic.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="divider" />
        <input
          type="text"
          placeholder="New Topic"
          className="input-bordered input input-sm w-full"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createTopic.mutate({
                title: e.currentTarget.value,
              });
            }
          }}
        />
      </div>
      <div className="col-span-3">
        <NoteEditor />
      </div>
    </div>
  )
}

interface ContentProps {

  sessionData: Session | null;
}