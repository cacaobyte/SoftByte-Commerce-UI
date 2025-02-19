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

    UpdateStatuRoll = async(data) => {
        const endpoint = this.endpoint.putRoll; 
        const headers = await getHeaders()
        return this.service.request({
          method: 'PUT',
          endpoint,
          data, 
          headers: headers,
        });
    };

}

export default RoleService;