import React, { useContext, useEffect, useState, useRef } from 'react'
import notesContext from '../context/notes/notesContext'
import NotesItem from './NotesItem';
function Notes() {

    // using context api for all notes
    const context = useContext(notesContext);
    const { note, get_all_notes, final_update_notes } = context;

    // using ref hooks for opening modal
    const inputEl = useRef(null);

    // maintain state of update form
    const [editNote, setEditNote] = useState({ title: "", description: "", tags: "", id: "" });

    // onchange function
    const onChange = (e) => {
        setEditNote({ ...editNote, [e.target.name]: e.target.value })
    }

    // edit notes function
    const edit_notes = (currentNote) => {
        setEditNote({ title: currentNote.title, description: currentNote.description, tags: currentNote.tags, id: currentNote._id })
        inputEl.current.click();
    }

    const update_note = (e) => {
        e.preventDefault();
        final_update_notes(editNote.title, editNote.description, editNote.tags, editNote.id)
    }

    // use effect hooks
    useEffect(() => {
        // eslint-disable-next-line
        get_all_notes()
    }, [])


    return (
        <>
            <h1>Your Notes</h1>
            <button type="button" ref={inputEl} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            {/* Edit Notes Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Notes</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        {/* update note form */}
                        <form id='edit_note_form'>
                            <div className="modal-body">
                                <input type='hidden' name='note_id' id='note_id' value={editNote.id} onChange={onChange} />
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" value={editNote.title} placeholder="Enter Title" required onChange={onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" className="form-control" id="description" name="description" value={editNote.description} placeholder="Enter Description" required onChange={onChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="tags">Tags</label>
                                    <input type="text" className="form-control" id="tags" name="tags" value={editNote.tags} placeholder="Enter Tags" onChange={onChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" onClick={update_note}>Update Notes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='container mx-3'>
                    {note.length === 0 && 'Notes not found'}
                </div>

                {note.map((note) => {
                    return <NotesItem key={note._id} edit_notes={edit_notes} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes