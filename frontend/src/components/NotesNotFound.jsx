import React from "react";
import { FileX } from "lucide-react";
import { Link } from "react-router-dom";

const NotesNotFound = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <FileX className="mb-4 size-10 text-emerald-400" />

      <h2 className="text-lg font-semibold mb-1">No notes yet</h2>
      <p className="text-sm opacity-60 mb-6">
        You haven’t created any notes. Start by adding your first one.
      </p>

      <Link
        to="/create"
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 transition"
      >
        Create your first note
      </Link>
    </div>
  );
};

export default NotesNotFound;
