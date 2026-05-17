import { useEffect, useState } from 'react'
import axios from 'axios'

import Sidebar from '../components/Sidebar'
import '../styles/dashboard.css'

function Dashboard() {

    const [totalProductos, setTotalProductos] = useState(0)

    const [stockBajo, setStockBajo] = useState(0)

    useEffect(() => {

        obtenerDatos()

    }, [])

    const obtenerDatos = async () => {

        try {

            const response = await axios.get(
                'http://localhost:3000/productos'
            )

            const productos = response.data

            setTotalProductos(productos.length)

            const bajos = productos.filter(
                producto => producto.stock <= 5
            )

            setStockBajo(bajos.length)

        } catch (error) {

            console.log(error)
        }
    }

    return (

        <div className="dashboard-container">

            <Sidebar />

            <div className="dashboard-content">

                <h1>
                    Panel Principal
                </h1>

                <div className="cards">

                    <div className="card">

                        <h3>Productos</h3>

                        <p>{totalProductos}</p>

                    </div>

                    <div className="card">

                        <h3>Ventas Hoy</h3>

                        <p>12</p>

                    </div>

                    <div className="card">

                        <h3>Stock Bajo</h3>

                        <p>{stockBajo}</p>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Dashboard