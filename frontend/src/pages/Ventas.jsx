import { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import '../styles/ventas.css'
import { useNavigate } from 'react-router-dom'

function Ventas() {

    const navigate = useNavigate()

    const [productos, setProductos] = useState([])
    const [search, setSearch] = useState('')
    const [carrito, setCarrito] = useState([])

    useEffect(() => {
        obtenerProductos()
    }, [])

    const obtenerProductos = async () => {
        const res = await axios.get('http://localhost:3000/productos')
        setProductos(res.data)
    }

    // FILTRADO
    const productosFiltrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(search.toLowerCase())
    )

    // AGREGAR CARRITO
    const agregarCarrito = (producto) => {

        const existe = carrito.find(p => p.id === producto.id)

        if (existe) {
            setCarrito(carrito.map(p =>
                p.id === producto.id
                    ? { ...p, cantidad: p.cantidad + 1 }
                    : p
            ))
        } else {
            setCarrito([...carrito, { ...producto, cantidad: 1 }])
        }
    }

    // TOTAL
    const total = carrito.reduce(
        (sum, p) => sum + p.precio * p.cantidad,
        0
    )

    // REGISTRAR VENTA
    const registrarVenta = async () => {

        try {

            const res = await axios.post('http://localhost:3000/ventas', {
                total
            })

            const ventaId = res.data.id

            for (let item of carrito) {

                await axios.post('http://localhost:3000/detalleVentas', {
                    ventaId,
                    productoId: item.id,
                    cantidad: item.cantidad,
                    subtotal: item.precio * item.cantidad
                })

                await axios.put(`http://localhost:3000/productos/${item.id}`, {
                    stock: item.stock - item.cantidad
                })
            }

            alert('Venta registrada')

            setCarrito([])
            obtenerProductos()

            navigate('/ventas/historial')

        } catch (error) {
            console.log(error)
            alert('Error al registrar venta')
        }
    }

    return (
    <div className="ventas-container">

        <Sidebar />

        <div className="ventas-content">

            {/* PRODUCTOS */}
            <div className="ventas-productos">

                <h2>Productos</h2>

                <input
                    className="input-search"
                    type="text"
                    placeholder="Buscar producto..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {productosFiltrados.map(p => (
                            <tr key={p.id}>
                                <td>{p.nombre}</td>
                                <td>S/. {p.precio}</td>
                                <td>{p.stock}</td>
                                <td>
                                    <button className="btn-add" onClick={() => agregarCarrito(p)}>
                                        Añadir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            {/* CARRITO */}
            <div className="ventas-carrito">

                <h2>Carrito</h2>

                {carrito.length === 0 ? (
                    <p>No hay productos</p>
                ) : (
                    carrito.map(p => (
                        <div className="carrito-item" key={p.id}>
                            <span>{p.nombre}</span>
                            <span>x {p.cantidad}</span>
                            <span>S/. {p.precio * p.cantidad}</span>
                        </div>
                    ))
                )}

                <hr />

                <h3>Total: S/. {total}</h3>

                <button className="btn-confirm" onClick={registrarVenta}>
                    Confirmar Venta
                </button>

            </div>

        </div>
    </div>
)
}

export default Ventas