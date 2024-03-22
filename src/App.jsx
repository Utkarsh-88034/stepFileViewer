import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import FileUpload from "./FileUpload";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Viewer from "./Viewer";

function App() {
  const [glb, setGlb] = useState();

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<FileUpload setGlb={setGlb} />} />
        <Route exact path="/viewer" element={<Viewer glb={glb} />} />
      </Routes>
    </Router>
  );
}

export default App;
