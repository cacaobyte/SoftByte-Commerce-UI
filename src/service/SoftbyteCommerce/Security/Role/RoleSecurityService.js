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

    getRolls = (data) => {
        const endpoint = this.endpoint.getRolls; 
        return this.service.request({
          method: 'POST',
          endpoint,
          data, 
          headers: this.defaultHeaders,
        });
    };

    createRoll = (data) => {
        const endpoint = this.endpoint.createRoll; 
        return this.service.request({
          method: 'POST',
          endpoint,
          data, 
          headers: this.defaultHeaders,
        });
    };

    UpdateStatuRoll = (data) => {
        const endpoint = this.endpoint.putRoll; 
        return this.service.request({
          method: 'PUT',
          endpoint,
          data, 
          headers: this.defaultHeaders,
        });
    };

}

export default RoleService;