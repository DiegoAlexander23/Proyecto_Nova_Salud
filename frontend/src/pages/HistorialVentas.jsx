import { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import '../styles/historial.css'


function HistorialVentas() {

    const [ventas, setVentas] = useState([])

    useEffect(() => {
        obtenerVentas()
    }, [])

    const obtenerVentas = async () => {
        try {
            const res = await axios.get('http://localhost:3000/ventas')

            console.log("DATA VENTAS:", res.data) // 👈 IMPORTANTE

            setVentas(Array.isArray(res.data) ? res.data : [])

        } catch (error) {
            console.log("ERROR VENTAS:", error)
        }
    }

    return (
    <div className="historial-container">

        <Sidebar />

        <div className="historial-content">

            <h1>Historial de Ventas</h1>

            {ventas.length === 0 ? (
                <p>No hay ventas registradas</p>
            ) : (
                ventas.map(v => (
                    <div className="venta-card" key={v.id}>

                        <p className="venta-total">
                            Total: S/. {v.total}
                        </p>

                        <p>
                            Fecha: {v.fecha ? new Date(v.fecha).toLocaleString() : 'sin fecha'}
                        </p>

                    </div>
                ))
            )}

        </div>

    </div>
)
}

export default HistorialVentas