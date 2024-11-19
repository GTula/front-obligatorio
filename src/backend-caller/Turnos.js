export class BackendCallerTurno {
    static #API_URL = 'http://127.0.0.1:5000/api/turnos';

    static async getAllTurnos() {
        try {
            const response = await fetch(this.#API_URL, { method: "GET" });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al obtener todas los turnos:", error);
        }
    }

    static async deleteTurnoById(turnoId) {
        try {
            const response = await fetch(`${this.#API_URL}/${turnoId}`, { method: "DELETE" });
            const data = await response.json();
            if (!response.ok) {
                throw data.error;
            }
            return null;
        } catch (error) {
            console.error("Error al eliminar el turno:", error);
            return error;
        }
    }
   
    
    static async getTurnoById(turnoId) {
        try {
            const response = await fetch(`${this.#API_URL}/${turnoId}`, { method: "GET" });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            return data; 
        } catch (error) {
            console.error("Error al recoger los detalles del turno:", error);
            return null;
        }
    }
    

    static async addTurno(obj) {
        try {
            const response = await fetch(this.#API_URL,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(obj)
                });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al ingresar turno:", error);
        }
    }

    static async putTurnoById(id, obj) {
        try {
            const response = await fetch(`${this.#API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al actualizar el turno:", error);
            return null; 
        }
    }
}

export default BackendCallerTurno;