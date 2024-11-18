export class BackendCallerClase {
    static #API_URL = 'http://127.0.0.1:5000/api/clases';

    static async getAllClases() {
        try {
            const response = await fetch(this.#API_URL, { method: "GET" });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al obtener todas las clases:", error);
        }
    }

    static async deleteClaseById(claseId) {
        try {
            const response = await fetch(`${this.#API_URL}/${claseId}`, { method: "DELETE" });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return { success: true };
        } catch (error) {
            console.error("Error al eliminar la clase:", error);
            return { success: false };
        }
    }

    static async getClaseById(claseId) {
        try {
            const response = await fetch(`${this.#API_URL}/${claseId}`, { method: "GET" });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            return data; 
        } catch (error) {
            console.error("Error al recoger los detalles de la clase:", error);
            return null;
        }
    }
    

    static async addClase(obj) {
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
            console.error("Error al ingresar clase:", error.message);
            if (error.message.includes("HTTP error! Status: 400")) {
                alert("Error: Instructor ya tiene una clase en este turno.");
            } else {
                alert("Error al conectar con el servidor o procesar la solicitud.");
            }
    
            throw error;
        }
    }

    static async putClaseById(claseId, obj) {
        try {
            const response = await fetch(`${this.#API_URL}/${claseId}`, {
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
            console.error("Error al actualizar la clase:", error);
            return null; 
        }
    }
}

export default BackendCallerClase;