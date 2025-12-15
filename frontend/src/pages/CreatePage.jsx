import React, { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import api from "../lib/axios"

const CreatePage = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !content) {
      toast.error("All fields are required.")
      return
    }

    setLoading(true)

    try {
      await api.post("/notes", {
        title,
        content,
      })

      toast.success("Note created successfully!")
      navigate("/")
    } catch (error) {
      console.error("Error creating note:", error)
      toast.error("Failed to create a note.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl text-center mx-auto p-4">
      <h1 className="my-3 text-2xl">Create Page</h1>

      <form
        onSubmit={handleSubmit}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
      >
        <label className="label">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input px-2"
          placeholder="My budget for Goa trip"
        />

        <label className="label">Content</label>
        <textarea
          className="input px-2 h-32 p-2"
          placeholder="Write your text here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="btn btn-neutral mt-4 bg-emerald-600"
        >
          {loading ? "Creating..." : "Create note"}
        </button>
      </form>
    </div>
  )
}

export default CreatePage
