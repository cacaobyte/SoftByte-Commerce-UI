import RestfulHandler from '../../../../module/handler/restfulHandler';
import enviroment from '../../../../settings/enviroments';
import { getHeaders } from '.././../../../module/headers'; 

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
            headers: getHeaders(),
        });
    };

    putWarehouseId = (warehouseId) => {
        const endpoint = this.endpoint.putWarehouse.replace("{0}", warehouseId); 
        return this.service.request({
            method: 'PUT',
            endpoint,
            headers: getHeaders(), 
        });
    };

    putWarehouse = (warehouse, warehouseId) => {
        if (!warehouseId) {
            console.error("Error: warehouseId es inválido.");
            return Promise.reject(new Error("warehouseId no puede ser nulo o indefinido"));
        }
        const endpoint = this.endpoint.editWarehouse.replace("{0}", warehouseId); 
        return this.service.request({
            method: 'PUT',
            endpoint,
            data: warehouse,
            headers: getHeaders(), 
        });
    };
    
    createWarehouse = (warehouse) => {
        const endpoint = this.endpoint.CreateWarehouse; 
        return this.service.request({
            method: 'POST',
            endpoint,
            data: warehouse,
            headers: getHeaders(), 
        });
    };

}

export default WarehouseService;