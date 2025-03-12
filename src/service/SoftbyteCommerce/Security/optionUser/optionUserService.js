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

      /**
     * Actualiza el estado de una opción asignada a un usuario.
     * @param {Object} data - Datos de la actualización.
     * @param {string} data.user - ID del usuario.
     * @param {number} data.option - ID de la opción.
     * @param {boolean} data.allowed - Nuevo estado de la opción.
     */
      updateUserOptionStatus = async ({ user, option, allowed }) => {
        if (!user || option == null) {
            return Promise.reject(new Error("El usuario y la opción son obligatorios"));
        }
    
        const endpoint = this.endpoint.updateUserOptionStatus;
        const headers = await getHeaders();
    
        const payload = {
            user,
            options: [option], // 🔥 Debe ser un array con un solo elemento
            allowed
        };
    
        console.log("Enviando payload al backend:", payload); // 🔍 Verifica lo que se envía
    
        return this.service.request({
            method: 'PUT',
            endpoint,
            data: payload,
            headers: headers,
        });
    };
    
    
    
    

}

export default OptionUserService;

