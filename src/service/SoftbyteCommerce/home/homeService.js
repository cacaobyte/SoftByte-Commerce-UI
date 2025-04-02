import RestfulHandler from '../../../module/handler/restfulHandler';
import enviroment from '../../../settings/enviroments';
import { getHeaders, getToken } from '.././../../module/headers'; 

class HomeService {
    constructor() {
        const { SoftByteCommerce } = enviroment.api;
        this.service = new RestfulHandler(SoftByteCommerce.url, SoftByteCommerce.timeout);
        this.endpoint = SoftByteCommerce.endpoint.home;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }

    getHomeGeneral = async() => {
        const endpoint = this.endpoint.getHomeGeneral;
        const headers = await getHeaders()
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: headers,
        });
    };
  

    

}

export default HomeService;