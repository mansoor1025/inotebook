import React, { useContext, useEffect } from 'react'
import notesContext from '../context/notes/notesContext';
function About() {


    const a = useContext(notesContext);
    useEffect(() => {
      a.update('mani khan');
    }, [])
    
    console.log('==================');
    console.log(a);
    return (
        <div>
            <h1>This is About page Im {a.state.name}</h1>
            </div>
    )
}

export default About