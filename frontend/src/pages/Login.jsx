import { useState } from 'react'
import axios from 'axios'
import '../styles/login.css'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {

        e.preventDefault()

        try {

            const response = await axios.post(
                'http://localhost:3000/users/login',
                {
                    email,
                    password
                }
            )

            console.log(response.data)
            navigate('/productos')

        } catch (error) {

            alert('Credenciales incorrectas')
        }
    }

    return (

        <div className="login-container">

            <div className="login-card">

                <div className="logo-section">
                    <h1>Nova Salud</h1><br />
                    <p>Sistema de Gestión de Botica</p>
                </div>

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">
                        Ingresar
                    </button>

                </form>

            </div>

        </div>
    )
}

export default Login