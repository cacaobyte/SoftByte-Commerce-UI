import RestfulHandler from '../../../../module/handler/restfulHandler';
import enviroment from '../../../../settings/enviroments';
import { getHeaders } from '.././../../../module/headers'; 

class OptionUserService {
    constructor() {
        const { SoftByteCommerce } = enviroment.api;
        this.service = new RestfulHandler(SoftByteCommerce.url, SoftByteCommerce.timeout);
        this.endpoint = SoftByteCommerce.endpoint.Accesses.UserOption;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }

    getOptionUsers = async() => {
        const endpoint = this.endpoint.getUserOption; 
        const headers = await getHeaders()
        return this.service.request({
          method: 'GET',
          endpoint,
          headers: headers,
        });
    };


    createOptionUsers = async() => {
        const endpoint = this.endpoint.assingOptionUser; 
        const headers = await getHeaders()
        return this.service.request({
          method: 'POST',
          endpoint,
          headers: headers,
        });
    };

    /**
     * Asigna una o más opciones a un usuario.
     * @param {Object} data - Datos de la asignación.
     * @param {string} data.user - ID del usuario.
     * @param {number[]} data.options - Array de opciones a asignar.
     * @param {boolean} data.allowed - Indica si el usuario tiene permitido acceder a las opciones.
     */
    assignOptionToUser = async ({ user, options, allowed = true }) => {
        if (!user || !Array.isArray(options) || options.length === 0) {
            return Promise.reject(new Error("El usuario y al menos una opción son obligatorios"));
        }

        const endpoint = this.endpoint.assingOptionUser; 
        const headers = await getHeaders();

        return this.service.request({
            method: 'POST',
            endpoint,
            data: {
                user,
                options, // Array de IDs de opciones
                allowed
            },
            headers: headers,
        });
    };


}

export default OptionUserService;

