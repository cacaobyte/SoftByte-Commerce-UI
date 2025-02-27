import RestfulHandler from '../../../../module/handler/restfulHandler';
import enviroment from '../../../../settings/enviroments';
import { getHeaders } from '.././../../../module/headers'; 

class RoleService {
    constructor() {
        const { SoftByteCommerce } = enviroment.api;
        this.service = new RestfulHandler(SoftByteCommerce.url, SoftByteCommerce.timeout);
        this.endpoint = SoftByteCommerce.endpoint.Accesses.Roll;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }

    getRolls = async(data) => {
        const endpoint = this.endpoint.getRoll; 
        const headers = await getHeaders()
        return this.service.request({
          method: 'GET',
          endpoint,
          data, 
          headers: headers,
        });
    };

    getRollsActive = async(data) => {
        const endpoint = this.endpoint.getRollActive; 
        const headers = await getHeaders()
        return this.service.request({
          method: 'GET',
          endpoint,
          data, 
          headers: headers,
        });
    };

    createRoll = async(data) => {
        const endpoint = this.endpoint.createRoll; 
        const headers = await getHeaders()
        return this.service.request({
          method: 'POST',
          endpoint,
          data, 
          headers: headers,
        });
    };

    UpdateStatuRoll = async (idRol, estado) => {
      if (!idRol || estado === undefined) {
          console.error("Error: idRol o estado son inválidos.");
          return Promise.reject(new Error("idRol y estado no pueden ser nulos o indefinidos"));
      }
  
      // Reemplazar {0} con idRol y {1} con estado en la URL
      const endpoint = this.endpoint.putRoll.replace("{0}", idRol).replace("{1}", estado);
      const headers = await getHeaders();
  
      return this.service.request({
          method: 'PUT',
          endpoint,
          headers: headers,
      });
  };
  

}

export default RoleService;