export class BackendCaller {
    static #API_URL = 'http://localhost:3000/api/tasks';

    static async getAllTasks() {
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

    static async deleteTaskById(taskId) {
        try {
            const response = await fetch(`${this.#API_URL}/${taskId}`, { method: "DELETE" });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return { success: true };
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
            return { success: false };
        }
    }

    static async postNewTask(obj) {
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
            console.error("Error al crear la tarea:", error);
        }
    }

    static async putTaskById(taskId, obj) {
        try {
            const response = await fetch(`${this.#API_URL}/${taskId}`,
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
            console.error("Error al actualizar la tarea:", error);
        }
    }
}

export default BackendCaller;