import RestfulHandler from '../../../../../module/handler/restfulHandler';
import enviroment from '../../../../../settings/enviroments';

class FaqsService {
    constructor() {
        const { SoftByteCommerce } = enviroment.api;
        this.service = new RestfulHandler(SoftByteCommerce.url, SoftByteCommerce.timeout);
        this.endpoint = SoftByteCommerce.endpoint.Support;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }

    getAllFaqs = async() => {
        const endpoint = this.endpoint.getFaqs;
        const headers = await getHeaders()
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: headers,
        });
    };

    

}

export default FaqsService;