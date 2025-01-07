"use client"

import { api, type RouterOutputs } from "~/trpc/react";
import { type Session } from "next-auth";
import { useState } from "react";
import { NoteEditor } from "./NoteEditor";
import { NoteCard } from "./NoteCard";

type Topic = RouterOutputs["topic"]["getAll"][0];

export const Content = ({ sessionData }: ContentProps) => {
  const [topics] = api.topic.getAll.useSuspenseQuery();
  const [newTopic, setNewTopic] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [notes] = api.note.getAll.useSuspenseQuery({ topicId: selectedTopic?.id ?? "" });


  const utils = api.useUtils();

  const createTopic = api.topic.create.useMutation({
    onSuccess: async () => {
      await utils.topic.invalidate();
      setNewTopic("");
    }
  });

  const createNote = api.note.create.useMutation({
    onSuccess: async () => {
      await utils.note.invalidate();
    }
  });

  const deleteNote = api.note.delete.useMutation({
    onSuccess: async () => {
      await utils.note.invalidate();
    }
  })

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
        <div>
          {notes?.map((note) => (
            <NoteCard note={note} onDelete={() => void deleteNote.mutate({ id: note.id })} />
          ))}
        </div>
        <NoteEditor onSave={({ title, content }) => {
          void createNote.mutate({
            title,
            content,
            topicId: selectedTopic?.id ?? ""
          })
        }} />
      </div>
    </div>
  )
}

interface ContentProps {

  sessionData: Session | null;
}