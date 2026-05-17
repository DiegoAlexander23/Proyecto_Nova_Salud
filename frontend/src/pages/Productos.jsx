import { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import '../styles/productos.css'

function Productos() {

    const [productos, setProductos] = useState([])

    const [form, setForm] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoria: ''
    })

    const [editId, setEditId] = useState(null)

    // GET PRODUCTOS
    const obtenerProductos = async () => {
        const res = await axios.get('http://localhost:3000/productos')
        setProductos(res.data)
    }

    useEffect(() => {
        obtenerProductos()
    }, [])

    // INPUT CHANGE
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // GUARDAR / ACTUALIZAR
    const guardarProducto = async () => {

        if (!form.nombre || !form.precio) {
            return alert('Completa los campos')
        }

        if (editId) {
            await axios.put(`http://localhost:3000/productos/${editId}`, form)
            alert('Producto actualizado')
        } else {
            await axios.post('http://localhost:3000/productos', form)
            alert('Producto creado')
        }

        obtenerProductos()
        cancelar()
    }

    // EDITAR
    const editarProducto = (p) => {
        setForm({
            nombre: p.nombre,
            descripcion: p.descripcion,
            precio: p.precio,
            stock: p.stock,
            categoria: p.categoria
        })
        setEditId(p.id)
    }

    // ELIMINAR
    const eliminarProducto = async (id) => {
        await axios.delete(`http://localhost:3000/productos/${id}`)
        obtenerProductos()
    }

    // CANCELAR
    const cancelar = () => {
        setForm({
            nombre: '',
            descripcion: '',
            precio: '',
            stock: '',
            categoria: ''
        })
        setEditId(null)
    }

    return (
        <div className="productos-container">

            <Sidebar />

            <div className="productos-content">

                {/* FORMULARIO */}
                <div className="productos-form">

                    <h2>{editId ? 'Editar Producto' : 'Nuevo Producto'}</h2>

                    <input
                        name="nombre"
                        placeholder="Nombre"
                        value={form.nombre}
                        onChange={handleChange}
                    />

                    <input
                        name="descripcion"
                        placeholder="Descripción"
                        value={form.descripcion}
                        onChange={handleChange}
                    />

                    <input
                        name="precio"
                        placeholder="Precio"
                        value={form.precio}
                        onChange={handleChange}
                    />

                    <input
                        name="stock"
                        placeholder="Stock"
                        value={form.stock}
                        onChange={handleChange}
                    />

                    <input
                        name="categoria"
                        placeholder="Categoría"
                        value={form.categoria}
                        onChange={handleChange}
                    />

                    <button onClick={guardarProducto}>
                        {editId ? 'Actualizar' : 'Guardar'}
                    </button>

                    {editId && (
                        <button onClick={cancelar}>
                            Cancelar
                        </button>
                    )}

                </div>

                {/* LISTA */}
                <div className="productos-lista">

                    <h2>Productos</h2>

                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {productos.map(p => (
                                <tr key={p.id}>
                                    <td>{p.nombre}</td>
                                    <td>{p.precio}</td>
                                    <td>{p.stock}</td>
                                    <td>
                                        <button onClick={() => editarProducto(p)}>
                                            Editar
                                        </button>

                                        <button onClick={() => eliminarProducto(p.id)}>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    )
}

export default Productos