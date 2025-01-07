

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { useState } from "react";

export const NoteEditor = ({ onSave }: NoteEditorProps) => {
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");

  return (
    <>

    </>
  )
}

interface NoteEditorProps {
  onSave: (note: { title: string; content: string }) => void;
}