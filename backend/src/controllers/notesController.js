export function getAllNotes(req, res){
    res.status(200).json({message: "Note fetched sucessfully."})
}
export function createNote(req, res){
    res.status(201).json({message: "Note created sucessfully."})
}
export function updateNote(req, res){
    res.status(200 ).json({message: "Note updated sucessfully."})
}
export function deleteNote(req, res){
    res.status(200  ).json({message: "Note deleted sucessfully."})
}