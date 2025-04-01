import RestfulHandler from '../../../../module/handler/restfulHandler';
import enviroment from '../../../../settings/enviroments';
import { getHeaders, getToken} from '.././../../../module/headers'; 

class QuotesService {
    constructor() {
        const { SoftByteCommerce } = enviroment.api;
        this.service = new RestfulHandler(SoftByteCommerce.url, SoftByteCommerce.timeout);
        this.endpoint = SoftByteCommerce.endpoint.quotes;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }


    getAllQuotesCacaoByte = async() => {
        const endpoint = this.endpoint.getAllQuotesCacaoByte;
        const headers = await getHeaders()
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: headers,
        });
    };


    
    CreateQuotes = async(data) => {
        const endpoint = this.endpoint.createQuotes; 
        const headers = await getHeaders()
        console.log("⚡ Llamando a CreateQuotes con endpoint:", endpoint);
        console.log("📦 Datos enviados en CreateQuotes:", data);
        return this.service.request({
            method: 'POST',
            endpoint: endpoint,
            data: data,
            headers: headers, 
        });
    };



    getAllQuotes = async() => {
        const endpoint = this.endpoint.getAllQuotes;
        const headers = await getHeaders()
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: headers,
        });
    };

    
    getAllQuotesStores = async() => {
        const endpoint = this.endpoint.getAllQuotesStores;
        const headers = await getHeaders()
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: headers,
        });
    };

    getMyQuotes = async() => {
        const endpoint = this.endpoint.getMyQuotes;
        const headers = await getHeaders()
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: headers,
        });
    };

    getMetricsQuotes = async() => {
        const endpoint = this.endpoint.getMetricsQuotes;
        const headers = await getHeaders()
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: headers,
        });
    };

    
}

export default QuotesService;