
import RestfulHandler from '../../../module/handler/restfulHandler';
import enviroment from '../../../settings/enviroments';
import { getHeaders, getToken} from '../../../module/headers'; 

class DepartamentService {
    constructor() {
        const { SoftByteCommerce } = enviroment.api;
        this.service = new RestfulHandler(SoftByteCommerce.url, SoftByteCommerce.timeout);
        this.endpoint = SoftByteCommerce.endpoint.Rrhh.Departaments;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }


    getAllDepartaments = async() => {
        const endpoint = this.endpoint.getAllDepartaments;
        const headers = await getHeaders()
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: headers,
        });
    };


    
    CreateDepartaments = async(data) => {
        const endpoint = this.endpoint.createDepartament; 
        const headers = await getHeaders()
        return this.service.request({
            method: 'POST',
            endpoint: endpoint,
            data: data,
            headers: headers, 
        });
    };



    UpdateDepartaments = async(data) => {
        const endpoint = this.endpoint.updateDepartament; 
        const headers = await getHeaders()
        return this.service.request({
            method: 'PUT',
            endpoint: endpoint,
            data: data,
            headers: headers, 
        });
    };

  


    
}

export default DepartamentService;