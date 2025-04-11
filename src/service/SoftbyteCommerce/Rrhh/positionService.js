
import RestfulHandler from '../../../module/handler/restfulHandler';
import enviroment from '../../../settings/enviroments';
import { getHeaders, getToken} from '../../../module/headers'; 

class PositionService {
    constructor() {
        const { SoftByteCommerce } = enviroment.api;
        this.service = new RestfulHandler(SoftByteCommerce.url, SoftByteCommerce.timeout);
        this.endpoint = SoftByteCommerce.endpoint.Rrhh.Position;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }


    getAllPositions = async() => {
        const endpoint = this.endpoint.getAllPosition;
        const headers = await getHeaders()
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: headers,
        });
    };


    
    CreatePositions = async(data) => {
        const endpoint = this.endpoint.createPosition; 
        const headers = await getHeaders()
        return this.service.request({
            method: 'POST',
            endpoint: endpoint,
            data: data,
            headers: headers, 
        });
    };



    UpdatePositions = async(data) => {
        const endpoint = this.endpoint.updatePosition; 
        const headers = await getHeaders()
        return this.service.request({
            method: 'PUT',
            endpoint: endpoint,
            data: data,
            headers: headers, 
        });
    };

  


    
}

export default PositionService;