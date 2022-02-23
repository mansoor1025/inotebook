import React, { useContext } from 'react'
import notesContext from '../context/notes/notesContext'
import NotesItem from './NotesItem';
function Notes() {
    const context = useContext(notesContext);
    const { note } = context;
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