import React from "react";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("Error deleting note", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="group block rounded-2xl border border-base-300 bg-base-200 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <h2 className="mb-2 line-clamp-1 text-lg font-semibold">
        {note.title}
      </h2>

      <p className="line-clamp-3 text-sm opacity-70">
        {note.content}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs opacity-50">
          {formatDate(note.createdAt)}
        </span>

        <div className="flex items-center gap-3 opacity-0 transition group-hover:opacity-100">
          <PenSquareIcon className="size-4 text-sky-400" />
          <Trash2Icon
            onClick={(e) => handleDelete(e, note._id)}
            className="size-4 cursor-pointer text-red-400 hover:text-red-500"
          />
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;