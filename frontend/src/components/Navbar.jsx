import React from "react";
import { Link } from "react-router-dom";
import { PlusIcon, NotebookPenIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight"
        >
          <NotebookPenIcon className="size-5 text-emerald-500" />
          <span>NotePad</span>
        </Link>

        {/* Actions */}
        <Link
          to="/create"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 transition"
        >
          <PlusIcon className="size-4" />
          Add Note
        </Link>
      </div>
    </header>
  );
};

export default Navbar;