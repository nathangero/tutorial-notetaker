"use client"

import { api, type RouterOutputs } from "~/trpc/react";
import { useState } from "react";
import { NoteEditor } from "./NoteEditor";
import { NoteCard } from "./NoteCard";

type Topic = RouterOutputs["topic"]["getAll"][0];

export const Content = () => {
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

  const deleteTopic = api.topic.delete.useMutation({
    onSuccess: async () => {
      await utils.topic.invalidate();
    }
  })

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
        <ul className="menu rounded-box bg-base-100">
          {topics?.map((topic) => (
            <li key={topic.id}>
              <a
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  setSelectedTopic(topic);
                }}
              >
                <button
                  className="btn btn-square btn-outline btn-error me-3 w-7 h-7"
                  onClick={async () => {
                    deleteTopic.mutate({
                      id: topic.id
                    });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-auto w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {topic.title}
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
            <NoteCard key={note.id} note={note} onDelete={() => void deleteNote.mutate({ id: note.id })} />
          ))}
        </div>
        <NoteEditor selectedTopic={selectedTopic} onSave={({ title, content }) => {
          createNote.mutate({
            title,
            content,
            topicId: selectedTopic?.id ?? ""
          })
        }} />
      </div>
    </div>
  )
}