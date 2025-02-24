import RestfulHandler from '../../../../module/handler/restfulHandler';
import enviroment from '../../../../settings/enviroments';
import { getHeaders } from '.././../../../module/headers'; 

class UsersService {
    constructor() {
        const { SoftByteCommerce } = enviroment.api;
        this.service = new RestfulHandler(SoftByteCommerce.url, SoftByteCommerce.timeout);
        this.endpoint = SoftByteCommerce.endpoint.Accesses.Users;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }

    getAllUsers = async() => {
        const endpoint = this.endpoint.getUsers; 
        const headers = await getHeaders()
        return this.service.request({
          method: 'GET',
          endpoint,
          headers: headers,
        });
    };

    getAllUsersActive = async() => {
        const endpoint = this.endpoint.getUsersActive; 
        const headers = await getHeaders()
        return this.service.request({
          method: 'GET',
          endpoint,
          headers: headers,
        });
    };


}

export default UsersService;

