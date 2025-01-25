import RestfulHandler from '../../../module/handler/restfulHandler';
//import RestfulHandler from '../../../../module/handler/restfulHandler';
import enviroment from '../../../settings/enviroments';

class CoursesService {
    constructor() {
        const { SoftByteCommerce } = enviroment.api;
        this.service = new RestfulHandler(SoftByteCommerce.url, umgCollab.timeout);
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

}

export default CoursesService;