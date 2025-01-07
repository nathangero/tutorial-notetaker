

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { useState } from "react";
import { type RouterOutputs } from "~/trpc/react";

type Topic = RouterOutputs["topic"]["getAll"][0];

export const NoteEditor = ({ selectedTopic, onSave }: NoteEditorProps) => {
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");

  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <input
            type="text"
            placeholder="Note title"
            className="input-primary input input-lg w-full font-bold"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </h2>
        <CodeMirror
          value={code}
          width="500px"
          height="30vh"
          minWidth="100%"
          minHeight="30vh"
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          onChange={(value) => setCode(value)}
          className="border border-gray-300"
        />
      </div>
      <div className="card-actions justify-end">
        <button
          className="btn-primary btn"
          onClick={() => {
            onSave({
              title,
              content: code
            });
            setTitle("");
            setCode("");
          }}
          disabled={title.trim().length === 0 || code.trim().length === 0 || selectedTopic === null}
        >
          Save
        </button>
      </div>
    </div>
  )
}

interface NoteEditorProps {
  selectedTopic: Topic | null;
  onSave: (note: { title: string; content: string }) => void;
}