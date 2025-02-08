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
// Listar las categorias activas
    getAllCategories = () => {
        const endpoint = this.endpoint.getCategoriesActive;
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: this.defaultHeaders,
        });
    };
// Listar todas las categorias
    getCategories = () => {
        const endpoint = this.endpoint.getCategorie;
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

    putInactiveCategory = (categoryId) => {
        if (!categoryId) {
            console.error("Error: categoryId es inválido.");
            return Promise.reject(new Error("categoryId no puede ser nulo o indefinido"));
        }
        const endpoint = this.endpoint.putInactiveCategory.replace("{0}", categoryId); 
        return this.service.request({
            method: 'PUT',
            endpoint,
            headers: this.defaultHeaders,
        });
    };
    

}

export default CategoriesService;