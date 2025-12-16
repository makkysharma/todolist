import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, Trash2Icon, SaveIcon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Error fetching note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add both title and content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating note", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20 text-sm opacity-70">Loading note…</div>;
  }

  if (!note) {
    return <div className="flex justify-center py-20 text-sm">Note not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-yellow-400 hover:text-yellow-300 transition"
        >
          <ArrowLeftIcon className="size-4" />
          Back to notes
        </Link>

        <button
          onClick={handleDelete}
          className="inline-flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition"
        >
          <Trash2Icon className="size-4" />
          Delete
        </button>
      </div>

      <div className="bg-base-200 border border-base-300 rounded-2xl shadow-sm p-6">
        <h1 className="text-xl font-semibold mb-6">Edit Note</h1>

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="label text-sm">Title</label>
            <input
              type="text"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
              placeholder="My budget for Goa trip"
              className="input input-bordered w-full p-2 px-3"
            />
          </div>

          <div>
            <label className="label text-sm">Content</label>
            <textarea
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
              placeholder="Write your note here…"
              className="textarea textarea-bordered w-full h-36 p-2 px-3"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="btn btn bg-emerald-500 w-full gap-2 disabled:opacity-60"
            >
              <SaveIcon className="size-4" />
              {saving ? "Saving…" : "Update Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteDetailPage;