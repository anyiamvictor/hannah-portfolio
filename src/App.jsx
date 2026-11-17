
import { Routes, Route } from 'react-router';

import PortfolioLayout from './layouts/PortfolioLayout/PortfolioLayout';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Experience from './pages/Experience/Experience';
import Contact from './pages/Contact/Contact';

function App() {
  return (
    <Routes>
      <Route element={<PortfolioLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
