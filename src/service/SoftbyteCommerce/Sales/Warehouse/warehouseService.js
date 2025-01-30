import RestfulHandler from '../../../../module/handler/restfulHandler';
import enviroment from '../../../../settings/enviroments';

class WarehouseService {
    constructor() {
        const { SoftByteCommerce } = enviroment.api;
        this.service = new RestfulHandler(SoftByteCommerce.url, SoftByteCommerce.timeout);
        this.endpoint = SoftByteCommerce.endpoint.Warehouse;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }


    getWarehouse = () => {
        const endpoint = this.endpoint.getWarehouse;
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: this.defaultHeaders,
        });
    };


}

export default WarehouseService;