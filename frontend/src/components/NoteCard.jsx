import React from 'react'
import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils'
import api from "../lib/axios"
import toast from "react-hot-toast"

const NoteCard = ({note, setNotes }) => {
  const handleDelete = async (e, id) =>{
    e.preventDefault();

    if(!window.confirm("Are you sure want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev)=> prev.filter(note=>note._id !== id))
      toast.success("Note deleted successfully");
    } catch (error) {
      toast.error("Failed to delete a note!")
      console.log("error deleting note(handleDelete)", error)
    }
  }

  return (
    <Link to={`/note/${note._id}`}
     className="card w-96 shadow-sm border-gray-700 border">
        <div className="card-body">
            <h2 className="card-title text-xl font-semibold">{note.title}</h2>
            <p className='text-gray-400'>{note.content}</p>

            <div className='flex items-center justify-between mt-6'>
                <p className='text-xs text-yellow-200'>{formatDate(note.createdAt)}</p>
                <div className="card-actions justify-end gap-4">
                    <PenSquareIcon className='size-4 text-blue-300'/>
                    <Trash2Icon onClick={(e)=>{handleDelete(e, note._id)}} className='size-4 text-red-300'/>
                </div>
            </div>

        </div>
    </Link>
  )
}

export default NoteCard
