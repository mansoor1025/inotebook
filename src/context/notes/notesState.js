import notesContext from "../notes/notesContext";
import { useState } from "react";

const host = 'http://localhost:5000/api'
const NotesState = (props) => {
    const note_data = [];
    const [note, setNote] = useState(note_data);

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

                    }
                )
        } catch (error) {

        }
    }

    // Add Note
    const add_note = (title, description, tags = "default") => {
        try {
            const url = `${host}/notes/add-note`;
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjp7ImlkIjoiNjIwYzllZmM2OGQ1OGM0MWJlMTk5MDI0In0sImlhdCI6MTY0NTAxMTIwMX0.k0oRK1diuNEJVgzEdzxKuJcpUc7w48gJmI_4cWAlc2E"
                },
                body: JSON.stringify({ title: title, description: description, tags: tags })
            };

            fetch(url, requestOptions)
                .then(res => res.json())
                .then(
                    (result) => {
                        get_all_notes()
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                    }
                )
        } catch (error) {
            console.log('error' + error);
        }
        console.log('note add successfully');
    }

    // update Note
    const final_update_notes = (title, description, tags = "default", note_id) => {
        try {
            const url = `${host}/notes/update-notes`;
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjp7ImlkIjoiNjIwYzllZmM2OGQ1OGM0MWJlMTk5MDI0In0sImlhdCI6MTY0NTAxMTIwMX0.k0oRK1diuNEJVgzEdzxKuJcpUc7w48gJmI_4cWAlc2E"
                },
                body: JSON.stringify({ title: title, description: description, tags: tags, note_id: note_id })
            };

            fetch(url, requestOptions)
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log('result');
                        console.log('=================');
                        console.log(result);
                        get_all_notes()
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                    }
                )
            get_all_notes()
            console.log('note updated successfully');
        } catch (error) {
            console.log('error' + error);
        }

    }

    // Delete Note
    const delete_note = (id) => {
        try {
            const url = `${host}/notes/delete-notes`;
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjp7ImlkIjoiNjIwYzllZmM2OGQ1OGM0MWJlMTk5MDI0In0sImlhdCI6MTY0NTAxMTIwMX0.k0oRK1diuNEJVgzEdzxKuJcpUc7w48gJmI_4cWAlc2E"
                },
                body: JSON.stringify({ note_id: id })
            };

            fetch(url, requestOptions)
                .then(res => res.json())
                .then(
                    (result) => {
                        get_all_notes()
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                    }
                )
        } catch (error) {
            console.log('error' + error);
        }
        console.log('note Delete successfully');
    }

    return (
        <notesContext.Provider value={{ note, setNote, add_note, delete_note, get_all_notes, final_update_notes }}>
            {props.children}
        </notesContext.Provider>
    )
}

export default NotesState;