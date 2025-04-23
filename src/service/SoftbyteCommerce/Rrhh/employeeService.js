
import RestfulHandler from '../../../module/handler/restfulHandler';
import enviroment from '../../../settings/enviroments';
import { getHeaders, getToken} from '../../../module/headers'; 

class EmployeeService {
    constructor() {
        const { SoftByteCommerce } = enviroment.api;
        this.service = new RestfulHandler(SoftByteCommerce.url, SoftByteCommerce.timeout);
        this.endpoint = SoftByteCommerce.endpoint.Rrhh.employees;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }


    getAllEmployees = async() => {
        const endpoint = this.endpoint.getAllEmployees;
        const headers = await getHeaders()
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: headers,
        });
    };


    
    CreateEmployees = async(data) => {
        const endpoint = this.endpoint.createEmployee; 
        const headers = await getHeaders()
        return this.service.request({
            method: 'POST',
            endpoint: endpoint,
            data: data,
            headers: headers, 
        });
    };



    UpdateEmployees = async(data) => {
        const endpoint = this.endpoint.updateEmployee; 
        const headers = await getHeaders()
        return this.service.request({
            method: 'PUT',
            endpoint: endpoint,
            data: data,
            headers: headers, 
        });
    };

    
  
}

export default EmployeeService;