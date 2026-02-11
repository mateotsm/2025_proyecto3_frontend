import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login';
import { ReclamoCreate } from './pages/ReclamoCreate'
import Dashboard from './pages/Dashboard'
import ReclamoList from './pages/ReclamoList';
import ReclamoAcciones from './pages/ReclamoAcciones';
import PrivateRoute from './routes/PrivateRoute';
import PrivateLayout from './layouts/PrivateLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirección inicial */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route
          element={
            <PrivateRoute>
              <PrivateLayout />
            </PrivateRoute>
          }
        >
          <Route path="/reclamos/nuevo" element={<ReclamoCreate />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reclamos" element={<ReclamoList />} />
          <Route path="/reclamos/:id/acciones" element={<ReclamoAcciones />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
