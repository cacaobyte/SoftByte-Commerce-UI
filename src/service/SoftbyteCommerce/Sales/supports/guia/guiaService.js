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

    getAllGuia = async() => {
        const endpoint = this.endpoint.getGuia;
        const headers = await getHeaders()
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: headers,
        });
    };

    

}

export default GuiaService;