

import { useState } from "react";
import ReactMarkdown from "react-markdown";

import { type RouterOutputs } from "~/trpc/react";

type Note = RouterOutputs["note"]["getAll"][0];

export const NoteCard = ({ note, onDelete }: NoteCardProps) => {
  const [isExpaned, setIsExpanded] = useState(false);

  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body m-0 p-3">
        <div
          className={`collapse-arrow ${isExpaned ? "collapse-open" : ""} collapse`}
          onClick={() => setIsExpanded(!isExpaned)}
        >
          <div className="collapse-title text-xl font-bold">{note.title}</div>
        </div>
      </div>
    </div>
  )
}

interface NoteCardProps {
  note: Note;
  onDelete: () => void;
}