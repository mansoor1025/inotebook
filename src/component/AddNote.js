import React, { useContext, useState } from 'react'
import notesContext from '../context/notes/notesContext'
function AddNote() {
    const context = useContext(notesContext);
    const { add_note } = context;
    const [note, setNote] = useState({ title: "", description: "", tags: "" })

    const addNote = (e) => {
        e.preventDefault();
        add_note(note.title, note.description, note.tags)
        document.getElementById("add_note_form").reset();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className='my-3'>
            <h1>Add Notes</h1>
            <form id='add_note_form'>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name="title" placeholder="Enter Title" required onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" name="description" placeholder="Enter Description" required onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="tags">Tags</label>
                    <input type="text" className="form-control" id="tags" name="tags" placeholder="Enter Tags" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={addNote}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote