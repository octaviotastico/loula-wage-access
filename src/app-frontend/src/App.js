// Libraries
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Local Imports
import Home from './views/Home';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
