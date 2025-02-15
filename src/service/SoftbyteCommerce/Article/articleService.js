import RestfulHandler from '../../../module/handler/restfulHandler';
import enviroment from '../../../settings/enviroments';
import { getHeaders, getToken } from '.././../../module/headers'; 

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
createArticle = async (articleData) => {
    try {
      const token = await getToken(); // Obtener el token directamente
      return this.service.request({
        method: 'POST',
        endpoint: this.endpoint.postArticles,
        data: articleData,
        headers: {
          Token: token, // Incluir el token directamente
          // No incluyas 'Content-Type', Axios lo manejará automáticamente para FormData
        },
      });
    } catch (error) {
      console.error('Error al crear el artículo:', error);
      throw error;
    }
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