import RestfulHandler from '../../../module/handler/restfulHandler';
import enviroment from '../../../settings/enviroments';
import { getHeaders } from '.././../../module/headers'; 

class SecurityService {
    constructor() {
        const { SoftByteCommerce } = enviroment.api;
        this.service = new RestfulHandler(SoftByteCommerce.url, SoftByteCommerce.timeout);
        this.endpoint = SoftByteCommerce.endpoint.Security;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }

    login = (data) => {
        const endpoint = this.endpoint.login; 
        return this.service.request({
          method: 'POST',
          endpoint,
          data, 
          headers: getHeaders(),
        });
    };

    register = (data) => {
        const endpoint = this.endpoint.register;
        return this.service.request({
            method: 'POST',
            endpoint,
            data:data,
            headers: getHeaders(),
        });
    };

    

}

export default SecurityService;