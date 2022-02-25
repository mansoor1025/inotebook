import notesContext from "../notes/notesContext";
import { useState } from "react";

const host = 'http://localhost:5000/api'
const NotesState = (props) => {
    const note_data = [];
    const [note, setNote] = useState(note_data);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // get all notes

    const get_all_notes = async () => {
        try {
            const url = `${host}/notes/fetch-notes`;
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjp7ImlkIjoiNjIwYzllZmM2OGQ1OGM0MWJlMTk5MDI0In0sImlhdCI6MTY0NTAxMTIwMX0.k0oRK1diuNEJVgzEdzxKuJcpUc7w48gJmI_4cWAlc2E"
                },
            };

            fetch(url, requestOptions)
                .then(res => res.json())
                .then(
                    (result) => {
                        setNote(result.success);
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        setError(error);
                    }
                )
        } catch (error) {

        }
    }

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
        const new_notes = note_data.filter((note) => { return note._id !== id });
        setNote(new_notes)
    }

    return (
        <notesContext.Provider value={{ note, setNote, add_note, delete_note, get_all_notes }}>
            {props.children}
        </notesContext.Provider>
    )
}

export default NotesState;