export class BackendCallerInstructor {
    static #API_URL = 'http://127.0.0.1:5000/api/instructores';

    static async getAllInstructores() {
        try {
            const response = await fetch(this.#API_URL, { method: "GET" });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al obtener todos los instructores:", error);
        }
    }

    static async deleteInstructorByCi(instructorCi) {
        try {
            const response = await fetch(`${this.#API_URL}/${instructorCi}`, { method: "DELETE" });
            const data = await response.json();
            if (!response.ok) {
                throw data.error;
            }

            return null;
        } catch (error) {
            console.error("Error al eliminar el instructor:", error);
            return error;
        }
    }


    static async getInstructorByCi(instructorCi) {
        try {
            const response = await fetch(`${this.#API_URL}/${instructorCi}`, { method: "GET" });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            return data.instructor; 
        } catch (error) {
            console.error("Error al recoger los detalles del intructor:", error);
            return null;
        }
    }
    

    static async addInstructor(obj) {
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
            console.error("Error al ingresar intructor:", error);
        }
    }

    static async putInstructorByCi(instructorCi, obj) {
        try {
            const response = await fetch(`${this.#API_URL}/${instructorCi}`, {
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
            console.error("Error al actualizar el instructor:", error);
            return null; 
        }
    }
    
}

export default BackendCallerInstructor;