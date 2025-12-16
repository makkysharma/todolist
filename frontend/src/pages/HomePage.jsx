import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import NotesNotFound from "../components/NotesNotFound";
import NoteCard from "../components/NoteCard";
import toast from "react-hot-toast";
import api from "../lib/axios";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes", error);
        if (error?.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to fetch notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading && (
          <div className="flex justify-center py-20">
            <span className="text-sm opacity-70">Loading notes…</span>
          </div>
        )}

        {!loading && !isRateLimited && notes.length === 0 && (
          <NotesNotFound />
        )}

        {!loading && !isRateLimited && notes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;