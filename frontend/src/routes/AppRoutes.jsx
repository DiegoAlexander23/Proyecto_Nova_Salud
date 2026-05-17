import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Productos from '../pages/Productos'
import Ventas from '../pages/Ventas'
import HistorialVentas from '../pages/HistorialVentas' // 👈 FALTA ESTO

function AppRoutes() {

    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/ventas" element={<Ventas />} />
                <Route path="/ventas/historial" element={<HistorialVentas />} />

            </Routes>

        </BrowserRouter>
    )
}

export default AppRoutes