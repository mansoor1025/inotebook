import notesContext from "../notes/notesContext";
import { useState } from "react";


const NotesState = (props) => {
    const note_data = [
        {
            "_id": "620ce27730cd3387469a3589",
            "user_id": "620c9efc68d58c41be199024",
            "title": "checkersdas",
            "description": "hello jeeasdsd",
            "tags": "dadasd",
            "created_at": "2022-02-16T03:39:19-08:00",
            "__v": 0
        },
        {
            "_id": "620ce2b530cd3387469a358d",
            "user_id": "620c9efc68d58c41be199024",
            "title": "my notes",
            "description": "bla bla bla",
            "tags": "dadasd",
            "created_at": "2022-02-16T03:39:19-08:00",
            "__v": 0
        }
    ]
    const [note, setNote] = useState(note_data)

    // Add Note

    const add_note = (title, description, tags = "default") => {

        const my_note = {
            "_id": "620ce2b530cd3387469a358d",
            "user_id": "620c9efc68d58c41be199024",
            "title": title,
            "description": description,
            "tags": tags,
            "created_at": "2022-02-16T03:39:19-08:00",
            "__v": 0
        }
        setNote(note_data.concat(my_note));
        console.log('note add successfully');
    }

    // Delete Note
    const delete_note = (id) => {
        console.log(id);
        const new_notes= note_data.filter((note) => { return note._id !== id });
        setNote(new_notes)
    }

    return (
        <notesContext.Provider value={{ note, setNote, add_note, delete_note }}>
            {props.children}
        </notesContext.Provider>
    )
}

export default NotesState;