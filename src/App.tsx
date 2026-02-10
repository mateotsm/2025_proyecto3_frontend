import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ReclamoCreate } from './pages/ReclamoCreate'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/reclamos/nuevo" />} />
        <Route path="/reclamos/nuevo" element={<ReclamoCreate />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
