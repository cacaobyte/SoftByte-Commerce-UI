import RestfulHandler from '../../../../../module/handler/restfulHandler';
import enviroment from '../../../../../settings/enviroments';

class GuiaService {
    constructor() {
        const { SoftByteCommerce } = enviroment.api;
        this.service = new RestfulHandler(SoftByteCommerce.url, SoftByteCommerce.timeout);
        this.endpoint = SoftByteCommerce.endpoint.Support;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }

    getAllGuia = () => {
        const endpoint = this.endpoint.getGuia;
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: this.defaultHeaders,
        });
    };

    

}

export default GuiaService;