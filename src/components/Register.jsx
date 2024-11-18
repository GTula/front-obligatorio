import { useState } from "react";
import { register } from "../backend-caller/Login";
import { useNavigate } from "react-router-dom";

function Register(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true); 
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://127.0.0.1:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                alert('Registro exitoso');
                navigate('/login');
            } else {
                const data = await response.json();
                setError(data.error || 'Error al registrarse');
            }
        } catch (err) {
            setError('Error al conectar con el servidor');
        }
        finally {
            setLoading(false); 
        }
    };

    return (
        <div>
        <h1>Registro</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <div>
            <label>Usuario:</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            </div>
            <div>
            <label>Contraseña:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <button type="submit">Registrar</button>
        </form>
        {loading && (
                <div class="loading-modal">
                    <div class="loading-content">
                        <div class="loading-spinner"></div>
                        <p class="loading-text">Cargando...</p>
                    </div>
                </div>
            )}
        </div>
        
    );
}

export default Register;