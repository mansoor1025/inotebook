import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import notesContext from '../context/notes/notesContext'
function NotesItem(props) {
    const context = useContext(notesContext);
    const { delete_note } = context;
    const { note, edit_notes } = props;
    return (
        <>
            <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 col-3 my-3'>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <i className="mx-3"><FontAwesomeIcon icon={faPen} onClick={() => { edit_notes(note) }} /></i>
                        <i className=""><FontAwesomeIcon icon={faTrash} onClick={() => { delete_note(note._id) }} /></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotesItem