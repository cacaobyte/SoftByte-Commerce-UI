import RestfulHandler from '../../../../module/handler/restfulHandler';
import enviroment from '../../../../settings/enviroments';
import { getHeaders, getToken} from '.././../../../module/headers'; 

class SalesService {
    constructor() {
        const { SoftByteCommerce } = enviroment.api;
        this.service = new RestfulHandler(SoftByteCommerce.url, SoftByteCommerce.timeout);
        this.endpoint = SoftByteCommerce.endpoint.sales;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }

       
    CreateSales = async(data) => {
        const endpoint = this.endpoint.createSale; 
        const headers = await getHeaders()
 
        return this.service.request({
            method: 'POST',
            endpoint: endpoint,
            data: data,
            headers: headers, 
        });
    };

}

export default SalesService;