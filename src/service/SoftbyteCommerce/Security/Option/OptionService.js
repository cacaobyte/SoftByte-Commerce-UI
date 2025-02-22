import RestfulHandler from '../../../../module/handler/restfulHandler';
import enviroment from '../../../../settings/enviroments';
import { getHeaders } from '.././../../../module/headers'; 

class OptionsService {
    constructor() {
        const { SoftByteCommerce } = enviroment.api;
        this.service = new RestfulHandler(SoftByteCommerce.url, SoftByteCommerce.timeout);
        this.endpoint = SoftByteCommerce.endpoint.Accesses.Options;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }

    getOptions = async(data) => {
        const endpoint = this.endpoint.Options; 
        const headers = await getHeaders()
        return this.service.request({
          method: 'GET',
          endpoint,
          data, 
          headers: headers,
        });
    };

    getByUserOptions = async(idUser) => {
        const endpoint = this.endpoint.getRollByUser.replace("{0}", idUser); 
        const headers = await getHeaders()
        return this.service.request({
          method: 'GET',
          endpoint,
          data, 
          headers: headers,
        });
    };


    createRoll = async(data) => {
        const endpoint = this.endpoint.Options; 
        const headers = await getHeaders()
        return this.service.request({
          method: 'POST',
          endpoint,
          data, 
          headers: headers,
        });
    };

    UpdateStatusOption = async (idOption, estado) => {
      if (!idOption || estado === undefined) {
          console.error("Error: idoption o estado son inválidos.");
          return Promise.reject(new Error("idRol y estado no pueden ser nulos o indefinidos"));
      }
  
      // Reemplazar {0} con idRol y {1} con estado en la URL
      const endpoint = this.endpoint.putStatusOption.replace("{0}", idOption).replace("{1}", estado);
      const headers = await getHeaders();
  
      return this.service.request({
          method: 'PUT',
          endpoint,
          headers: headers,
      });
  };
  

}

export default OptionsService;

