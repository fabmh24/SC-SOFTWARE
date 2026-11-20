class LoginService {
    static BASE_URL = "http://api.soportecarranza.com.mx:8080/login";

    static async login(usuario,contrasena) {
        try {
            console.log("Enviando petición POST:", this.BASE_URL);

            const respuesta = await fetch(this.BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    username: usuario,
                    password: contrasena
                })
            });

            return respuesta;

        } catch (error) {
            console.error("Error al enviar petición:", error);
            throw error;
        }
    }
}

export default LoginService;