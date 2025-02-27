import RestfulHandler from '../../../module/handler/restfulHandler';
import enviroment from '../../../settings/enviroments';
import { getHeaders } from '.././../../module/headers'; 

class UserService {
    constructor() {
        const { SoftByteCommerce } = enviroment.api;
        this.service = new RestfulHandler(SoftByteCommerce.url, SoftByteCommerce.timeout);
        this.endpoint = SoftByteCommerce.endpoint.Users;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }


    getProfile = async() => {
        const endpoint = this.endpoint.profile; 
        const headers = await getHeaders()
        return this.service.request({
          method: 'GET',
          endpoint,
          headers: headers,
        });
    };

}

export default UserService;