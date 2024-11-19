
export class BackendCallerAlumno {    
    static #API_URL = 'http://127.0.0.1:5000/api/alumnos';

    static async getAllStudents() {
        try {
            const response = await fetch(this.#API_URL, { method: "GET" });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al obtener todas las tareas:", error);
        }
    }

    static async deleteStudentByCi(studentCi) {
        try {
            const response = await fetch(`${this.#API_URL}/${studentCi}`, { method: "DELETE" });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return { success: true };
        } catch (error) {
            console.error("Error al eliminar el estudiante:", error);
            return { success: false };
        }
    }

    static async getStudentByCi(studentCi) {
        try {
            const response = await fetch(`${this.#API_URL}/${studentCi}`, { method: "GET" });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            return data.alumnos; 
        } catch (error) {
            console.error("Error al recoger los detalles del estudiante:", error);
            return null;
        }
    }
    

    static async addStudent(obj) {
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
            console.error("Error al ingresar estudiante:", error);
        }
    }

    static async putAlumnoByCi(alumnoCi, obj) {
        try {
            const response = await fetch(`${this.#API_URL}/${alumnoCi}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(obj)
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al actualizar el alumno:", error);
        }
    }
}

export default BackendCallerAlumno;