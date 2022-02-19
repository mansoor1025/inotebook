
import './App.css';
import Navbar from './component/Navbar';
import {
  Route,
  Routes
} from "react-router-dom";
import Home from './component/Home';
import About from './component/About';
import NotesState from './context/notes/notesState';
function App() {
  return (
    <>
      <NotesState>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </NotesState>
    </>
  );
}

export default App;
