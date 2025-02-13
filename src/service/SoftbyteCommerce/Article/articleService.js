import RestfulHandler from '../../../module/handler/restfulHandler';
import enviroment from '../../../settings/enviroments';
import { getHeaders } from '.././../../module/headers'; 

class ArticlesService {
    constructor() {
        const { SoftByteCommerce } = enviroment.api;
        this.service = new RestfulHandler(SoftByteCommerce.url, SoftByteCommerce.timeout);
        this.endpoint = SoftByteCommerce.endpoint.articles;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }

    getArticles = () => {
        const endpoint = this.endpoint.getArticles;
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: getHeaders(),
        });
    };

    getArticlesWholesale = () => {
        const endpoint = this.endpoint.getArticlesWholesale;
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: getHeaders(),
        });
    };

    /**
     * Crea un nuevo artículo
     * @param {FormData} articleData - Datos del artículo en FormData (incluye imagen)
     */
    createArticle = (articleData) => {
        return this.service.request({
            method: 'POST',
            endpoint: this.endpoint.postArticles, 
            data: articleData,
            headers: getHeaders(), // No especificamos Content-Type, Axios lo manejará automáticamente
        });
    };
    

          /**
     * Obtiene todos los artículos activos
     * @returns {Promise} Lista de artículos activos
     */
    getAllArticles = () => {
        const endpoint = this.endpoint.getAllArticles; // Usa el nuevo endpoint definido
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: getHeaders(),
        });
    };  

}

export default ArticlesService;