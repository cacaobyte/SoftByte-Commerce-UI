import RestfulHandler from '../../../../module/handler/restfulHandler';
import enviroment from '../../../../settings/enviroments';
import { getHeaders } from '.././../../../module/headers'; 

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
            headers: getHeaders(),
        });
    };
// Listar todas las categorias
    getCategories = () => {
        const endpoint = this.endpoint.getCategorie;
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: getHeaders(),
        });
    };

putCategories = (categorie) => {
    const endpoint = this.endpoint.putCategorie;
    const cleanCategory = {
        idCategoria: categorie.idCategoria,
        nombre: categorie.nombre,
        descripcion: categorie.descripcion || null
    };

    return this.service.request({
        method: "PUT",
        endpoint,
        data: cleanCategory, 
        headers: getHeaders(),
    });
};

      
createCategory = (newCategory) => {
    const endpoint = this.endpoint.createCategorie;
    const cleanCategory = {
        nombre: newCategory.nombre,
        descripcion: newCategory.descripcion || null
    };

    return this.service.request({
        method: "POST",
        endpoint,
        data: cleanCategory,
        headers: getHeaders(),
    });
};
 
      


    getCategoriesSubCategories = () => {
        const endpoint = this.endpoint.getCategoriesSubCategories;
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: getHeaders(),
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
            headers: getHeaders(),
        });
    };
    

}

export default CategoriesService;