// Libraries
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Views
import Home from './views/Home';
import Send from './views/Send';
import Advances from './views/Advances/Advances';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/send" element={<Send />} />
        <Route path="/advances" element={<Advances />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
