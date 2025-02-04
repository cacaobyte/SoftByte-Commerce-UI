import RestfulHandler from '../../../../module/handler/restfulHandler';
import enviroment from '../../../../settings/enviroments';

class RegionsService {
    constructor() {
        const { SoftByteCommerce } = enviroment.api;
        this.service = new RestfulHandler(SoftByteCommerce.url, SoftByteCommerce.timeout);
        this.endpoint = SoftByteCommerce.endpoint.Regions;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }

    getRegions = () => {
        const endpoint = this.endpoint.getRegions;
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: this.defaultHeaders,
        });
    };


    

}

export default RegionsService;