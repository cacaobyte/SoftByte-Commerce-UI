import RestfulHandler from '../../../../module/handler/restfulHandler';
import enviroment from '../../../../settings/enviroments';
import { getHeaders } from '.././../../../module/headers'; 

class GrouperService {
    constructor() {
        const { SoftByteCommerce } = enviroment.api;
        this.service = new RestfulHandler(SoftByteCommerce.url, SoftByteCommerce.timeout);
        this.endpoint = SoftByteCommerce.endpoint.Accesses.Grouper;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }

    getGroupers = async() => {
        const endpoint = this.endpoint.getGrouper; 
        const headers = await getHeaders()
        return this.service.request({
          method: 'GET',
          endpoint,
          headers: headers,
        });
    };



}

export default GrouperService;

