import RestfulHandler from '../../../../module/handler/restfulHandler';
//import RestfulHandler from '../../../../module/handler/restfulHandler';
import enviroment from '../../../../settings/enviroments';
import { getHeaders } from '.././../../../module/headers'; 

class RoleuserService {
    constructor() {
        const { SoftByteCommerce } = enviroment.api;
        this.service = new RestfulHandler(SoftByteCommerce.url, SoftByteCommerce.timeout);
        this.endpoint = SoftByteCommerce.endpoint.Accesses.RoleUser;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }

    getRollsUsers = async() => {
        const endpoint = this.endpoint.getRolesUsers; 
        const headers = await getHeaders()
        return this.service.request({
          method: 'GET',
          endpoint,
          headers: headers,
        });
    };



}

export default RoleuserService;