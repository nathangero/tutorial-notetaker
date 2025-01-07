

import { useState } from "react";
import ReactMarkdown from "react-markdown";

import { type RouterOutputs } from "~/trpc/react";

type Note = RouterOutputs["note"]["getAll"][0];

export const NoteCard = ({ note, onDelete }: NoteCardProps) => {
  const [isExpaned, setIsExpanded] = useState(false);
}

interface NoteCardProps {
  note: Note;
  onDelete: () => void;
}