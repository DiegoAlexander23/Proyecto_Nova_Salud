import { Link } from 'react-router-dom'
import '../styles/sidebar.css'

function Sidebar() {

    return (

        <div className="sidebar">

            <h2>Nova Salud</h2>

            <ul>


                <li>
                    <Link to="/productos">
                        Productos
                    </Link>
                </li>

                <li>
                    <Link to="/ventas">
                        Ventas
                    </Link>
                </li>
                <li>
                    <Link to="/ventas/historial">
                        Historial de Ventas
                    </Link>
                </li>

                <li>
                    <Link to="/">
                        Cerrar Sesión
                    </Link>
                </li>

            </ul>

        </div>
    )
}

export default Sidebar