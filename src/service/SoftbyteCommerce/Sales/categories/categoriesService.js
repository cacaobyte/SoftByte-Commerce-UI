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
    getAllCategories = async() => {
        const endpoint = this.endpoint.getCategoriesActive;
        const headers = await getHeaders()
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: headers,
        });
    };
// Listar todas las categorias
    getCategories = async() => {
        const endpoint = this.endpoint.getCategorie;
        const headers = await getHeaders()
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: headers,
        });
    };

putCategories = async(categorie) => {
    const endpoint = this.endpoint.putCategorie;
    const headers = await getHeaders()
    const cleanCategory = {
        idCategoria: categorie.idCategoria,
        nombre: categorie.nombre,
        descripcion: categorie.descripcion || null
    };

    return this.service.request({
        method: "PUT",
        endpoint,
        data: cleanCategory, 
        headers: headers,
    });
};

      
createCategory = async(newCategory) => {
    const endpoint = this.endpoint.createCategorie;
    const headers = await getHeaders()
    const cleanCategory = {
        nombre: newCategory.nombre,
        descripcion: newCategory.descripcion || null
    };

    return this.service.request({
        method: "POST",
        endpoint,
        data: cleanCategory,
        headers: headers,
    });
};
 
      


    getCategoriesSubCategories = async() => {
        const endpoint = this.endpoint.getCategoriesSubCategories;
        const headers = await getHeaders()
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: headers,
        });
    };

    putInactiveCategory = async(categoryId) => {
        if (!categoryId) {
            console.error("Error: categoryId es inválido.");
            return Promise.reject(new Error("categoryId no puede ser nulo o indefinido"));
        }
        const endpoint = this.endpoint.putInactiveCategory.replace("{0}", categoryId);
        const headers = await getHeaders() 
        return this.service.request({
            method: 'PUT',
            endpoint,
            headers: headers,
        });
    };
    

}

export default CategoriesService;