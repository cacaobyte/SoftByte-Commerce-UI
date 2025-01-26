import RestfulHandler from '../../../module/handler/restfulHandler';
import enviroment from '../../../settings/enviroments';

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
            headers: this.defaultHeaders,
        });
    };

    getArticlesWholesale = () => {
        const endpoint = this.endpoint.getArticlesWholesale;
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: this.defaultHeaders,
        });
    };

}

export default ArticlesService;