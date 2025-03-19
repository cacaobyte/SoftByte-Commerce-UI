import RestfulHandler from '../../../../module/handler/restfulHandler';
import enviroment from '../../../../settings/enviroments';
import { getHeaders, getToken} from '.././../../../module/headers'; 

class ClientsService {
    constructor() {
        const { SoftByteCommerce } = enviroment.api;
        this.service = new RestfulHandler(SoftByteCommerce.url, SoftByteCommerce.timeout);
        this.endpoint = SoftByteCommerce.endpoint.clients;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }

    getClients = async() => {
        const endpoint = this.endpoint.getClients;
        const headers = await getHeaders()
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: headers,
        });
    };

    getContectClients = async() => {
        const endpoint = this.endpoint.contactClients;
        const headers = await getHeaders()
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: headers,
        });
    };

    /**
     * Crea un nuevo cliente con su información y una imagen opcional
     * @param {FormData} clientData - Datos del cliente en FormData (incluye imagen si aplica)
     */
    createClients = async (clientData) => {
        try {
            const token = await getToken(); // Obtener el token directamente
            
            return await this.service.request({
                method: "POST",
                endpoint: this.endpoint.createClient,
                data: clientData,
                headers: {
                    Token: token, // Incluir el token en los headers
                    // Axios maneja automáticamente 'Content-Type' para FormData
                },
            });
        } catch (error) {
            console.error("Error al crear el cliente:", error);
            throw error;
        }
    };

        /**
     * Actualiza un cliente existente con nueva información y/o imagen
     * @param {FormData} clientData - Datos actualizados del cliente (incluye imagen si aplica)
     */
        updateClient = async (clientData) => {
            try {
                const token = await getToken(); // Obtener el token directamente
                return await this.service.request({
                    method: "PUT", // 🔹 Método PUT para actualizar
                    endpoint: this.endpoint.updateClient, // 🔹 Endpoint de actualización
                    data: clientData,
                    headers: {
                        Token: token, // 🔹 Autorización con el token
                        // Axios maneja automáticamente 'Content-Type' para FormData
                    },
                });
            } catch (error) {
                console.error("Error al actualizar el cliente:", error);
                throw error;
            }
        };

}

export default ClientsService;