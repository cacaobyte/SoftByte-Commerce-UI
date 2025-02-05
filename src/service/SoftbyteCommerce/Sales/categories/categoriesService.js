import RestfulHandler from '../../../../module/handler/restfulHandler';
import enviroment from '../../../../settings/enviroments';

class CategoriesService {
    constructor() {
        const { SoftByteCommerce } = enviroment.api;
        this.service = new RestfulHandler(SoftByteCommerce.url, SoftByteCommerce.timeout);
        this.endpoint = SoftByteCommerce.endpoint.categories;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }

    getAllCategories = () => {
        const endpoint = this.endpoint.getCategories;
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: this.defaultHeaders,
        });
    };

    getCategoriesSubCategories = () => {
        const endpoint = this.endpoint.getCategoriesSubCategories;
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: this.defaultHeaders,
        });
    };
    

}

export default CategoriesService;