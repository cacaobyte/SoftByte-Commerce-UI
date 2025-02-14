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

    getArticles = async() => {
        const endpoint = this.endpoint.getArticles;
        const headers = await getHeaders()
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: headers,
        });
    };

    getArticlesWholesale = async() => {
        const endpoint = this.endpoint.getArticlesWholesale;
        const headers = await getHeaders()
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: headers,
        });
    };

    /**
     * Crea un nuevo artículo
     * @param {FormData} articleData - Datos del artículo en FormData (incluye imagen)
     */
    createArticle = async(articleData) => {
        const headers = await getHeaders()
        return this.service.request({
            method: 'POST',
            endpoint: this.endpoint.postArticles, 
            data: articleData,
            headers: headers, 
        });
    };
    

          /**
     * Obtiene todos los artículos activos
     * @returns {Promise} Lista de artículos activos
     */
    getAllArticles = async() => {
        const endpoint = this.endpoint.getAllArticles;
        const headers = await getHeaders()
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: headers,
        });
    };  

}

export default ArticlesService;