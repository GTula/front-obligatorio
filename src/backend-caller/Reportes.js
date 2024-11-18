export class BackendCallerReportes {
    static #API_URL = 'http://127.0.0.1:5000/api/reportes';

    static async getActividadesConMasAlumnos() {
        try {
            const response = await fetch(`${this.#API_URL}/alumnos-actividades` , { method: "GET" });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al obtener todas las tareas:", error);
        }
    }
    static async getActividadesConMasIngresos() {
        try {
            const response = await fetch(`${this.#API_URL}/ingresos-actividades` , { method: "GET" });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al obtener todas las tareas:", error);
        }
    }

    static async getTurnosMasDictados() {
        try {
            const response = await fetch(`${this.#API_URL}/turnos-dictados` , { method: "GET" });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al obtener todas las tareas:", error);
        }
    }
}
export default BackendCallerReportes;