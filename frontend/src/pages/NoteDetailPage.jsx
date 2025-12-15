import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../lib/axios"
import toast from "react-hot-toast"
import { ArrowLeftIcon, Trash2Icon } from "lucide-react"
import { Link } from 'react-router'

const NoteDetailPage = () => {
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        console.error("Error fetching note:", error)
        toast.error("Error fetching note")
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [id])

  const handleDelete = async() =>{

    if(!window.confirm("Are you sure want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`)
      toast.success("Note deleted")
      navigate("/")
    } catch (error) {
      console.log("error deleting note",error)
      toast.error("Failed to delete note.")
      
    }
  }

  const handleSave = async() =>{

    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please add title or content.")
      return;
    }

    setSaving(true)

    try {
      await api.put(`/notes/${id}`,note);
      toast.success("Note updated successfully.")
      navigate("/")

    } catch (error) {
      console.log("error deleting note",error)
      toast.error("Failed to delete note.")
    }

  }

  if (loading) {
    return <div className="text-center py-10">Loading...</div>
  }

  if (!note) {
    return <div className="text-center py-10">Note not found</div>
  }

  return (
    <div className="max-w-7xl text-center mx-auto p-4">
      <h1 className="my-3 text-2xl">Edit Note</h1>

      <div className="flex justify-between items-center text-xs py-4">
        <Link to={'/'} className="flex items-center gap-1 text-yellow-400">
          <ArrowLeftIcon className="size-3"/>
          <span>Back to notes</span>
        </Link>
        <div className="flex items-center gap-1 text-red-400" onClick={handleDelete}>
          <Trash2Icon className="size-3"/>
          <span>Delete the note</span>
        </div>
      </div>

      <form className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <label className="label">Title</label>
        <input
          type="text"
          value={note.title}
          onChange={(e) =>
            setNote({ ...note, title: e.target.value })
          }
          className="input px-2"
          placeholder="My budget for Goa trip"
        />

        <label className="label">Content</label>
        <textarea
          className="input px-2 h-32 p-2"
          placeholder="Write your text here..."
          value={note.content}
          onChange={(e) =>
            setNote({ ...note, content: e.target.value })
          }
        />

        <button
          type="submit"
          disabled={saving}
          onClick={handleSave }
          className="btn btn-neutral mt-4 bg-emerald-600"
        >
          {saving ? "Saving..." : "Update note"}
        </button>
      </form>
    </div>
  )
}

export default NoteDetailPage
