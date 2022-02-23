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

    return (
        <notesContext.Provider value={{ note, setNote }}>
            {props.children}
        </notesContext.Provider>
    )
}

export default NotesState;