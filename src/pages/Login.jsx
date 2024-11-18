import { useContext, useState } from "react";
import { authenticatedContext } from "../App";
import { useNavigate } from "react-router-dom";
import { login } from "../backend-caller/Login";
import './pagesStyles.css';

function Login(){
    const [isAuthenticated, setIsAuthenticated] = useContext(authenticatedContext);

    const navigate = useNavigate();



    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); 
        try {
            const response = await fetch('http://127.0.0.1:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                setIsAuthenticated(true)
                navigate('/');
            } else {
                const data = await response.json();
                setError(data.error || 'Error al iniciar sesión');
            }
        } catch (err) {
            setError('Error al conectar con el servidor');
        }
        finally {
            setLoading(false); 
        }
    };

    const goToRegister = () =>{
        navigate('/register')
    }
    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br/>
                <button type="submit">Iniciar Sesión</button>
                
            </form>
            <button onClick={goToRegister}>Registrarse</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading && (
                <div className="loading-modal">
                    <div className="loading-content">
                        <div className="loading-spinner"></div>
                        <p className="loading-text">Cargando...</p>
                    </div>
                </div>
            )}
        </div>
    );


}

export default Login;