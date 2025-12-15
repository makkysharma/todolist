import { Route, Routes } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast'

import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NoteDetailPage from "./pages/NoteDetailPage"

const App = () => {
  return (
    <div data-theme="coffee">

      {/* <button onClick={() => toast.success("congo")}>
        Success
      </button> */}

      <Toaster />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/note/:id' element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}

export default App
