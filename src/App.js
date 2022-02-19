
import './App.css';
import Navbar from './component/Navbar';
import {
  Route,
  Routes
} from "react-router-dom";
import Home from './component/Home';
import About from './component/About';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
