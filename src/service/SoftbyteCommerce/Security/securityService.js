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
          headers: this.defaultHeaders,
        });
    };

    register = async(data) => {
        const endpoint = this.endpoint.register;
        const headers = await getHeaders()
        return this.service.request({
            method: 'POST',
            endpoint,
            data:data,
            headers: headers,
        });
    };

    getProfile = async () => {
        const endpoint = this.endpoint.login; 
        const headers = await getHeaders();
        return this.service.request({
          method: 'GET',
          endpoint,
          data, 
          headers: headers,
        });
    };





}

export default SecurityService;