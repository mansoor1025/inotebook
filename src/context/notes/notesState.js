import notesContext from "../notes/notesContext";
import { useState } from "react";

const NotesState = (props) => {

    const s1 = {
        name: 'mansoor mohammad ali',
        age: 26
    }
    const [state, setState] = useState(s1)

    const update = (name) => {
        console.log('function is running');
        setTimeout(function () {
            setState({
                name: name,
                age: 26
            })
        }, 1000);
    }
    return (
        <notesContext.Provider value={{ state, update }}>
            {props.children}
        </notesContext.Provider>
    )
}

export default NotesState;