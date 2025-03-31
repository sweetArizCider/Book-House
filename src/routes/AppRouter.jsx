import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Libro from '../pages/Libro/Libro';
import Multas from '../pages/Multas/Multas';
import Register from '../pages/Register/Register';
import CrearLibro from '../pages/CrearLibro/CrearLibro';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/libro" element={<Libro />} />
        <Route path="/multas" element={<Multas />} />
        <Route path="/register" element={<Register />} />
        <Route path="/crear/libro" element={<CrearLibro />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;