import React, { useContext, useEffect } from 'react'
import notesContext from '../context/notes/notesContext'
import NotesItem from './NotesItem';
function Notes() {
    const context = useContext(notesContext);
    const { note, get_all_notes } = context;
    useEffect(() => {
        get_all_notes()
    },[])

    return (
        <>
            <h1>Your Notes</h1>
            <div className='row'>
                {note.map((note) => {
                    return <NotesItem key={note._id} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes