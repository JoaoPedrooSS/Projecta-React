import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Container from "./Components/Layout/Container";
import NewProject from "./Components/pages/NewProject";
import Company from "./Components/pages/Company";
import Contact from "./Components/pages/Contact";
import Home from "./Components/pages/Home";
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
import Projects from "./Components/pages/Projects";
import Project from "./Components/pages/Project";

function App() {
  return (
    <Router>
     <Navbar />
      <Container customClass="min-height">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
