
const environment = "https://localhost:32778/api/cc/warehouse/";
//Produccion
//const environment = "https://softbyte-commerce-api.onrender.com/api/cc/warehouse/";


module.exports = {
    api: {
        SoftByteCommerce: {
            url: environment, 
            timeout: 900000,
            endpoint: {
                articles:{
                    getArticles: "articulos",
                    getArticlesWholesale: "articulosMayoreo",
                },
                categories:{
                    getCategories: "categorias",
                },
                users:{
                    getUsers: "usuarios",
                },
                sales:{
                    getSales: "ventas",
                },

            }
        }
    }
};