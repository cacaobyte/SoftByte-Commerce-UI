const { Warehouse } = require("lucide-react");

const environment = "https://localhost:32771/";
//Produccion
//const environment = "https://softbyte-commerce-api.onrender.com/";


module.exports = {
    api: {
        SoftByteCommerce: {
            url: environment, 
            timeout: 900000,
            endpoint: {
                articles:{
                    getAllArticles: "api/cc/warehouse/articulosTodos",
                    getArticles: "api/cc/warehouse/articulos",
                    getArticlesWholesale: "api/cc/warehouse/articulosMayoreo",
                    postArticles: "api/cc/warehouse/crearArticulos",
                    /*Pendientes
                    Actualizar articulos
                    desactivar acticulos
                    */
                },
                categories:{
                    getCategoriesActive: "api/cc/warehouse/logistic/categoriesActive",
                    getCategorie: "api/cc/warehouse/logistic/categories",
                    putCategorie: "api/cc/warehouse/logistic/categoriesUpdate",
                    createCategorie: "api/cc/warehouse/logistic/createCategory",
                    getCategoriesSubCategories: "api/cc/warehouse/logistic/categoriesSubCategories",
                    putInactiveCategory: "api/cc/warehouse/logistic/categories/toggleStatus/{0}",
                },
                users:{
                    getUsers: "usuarios",
                },
                clients:{
                    getClients: "clients/allClients",
                },
                sales:{
                    getSales: "ventas",
                },
                Warehouse:{
                    getWarehouse: "api/cc/warehouse/bodegas",
                    CreateWarehouse: "api/cc/warehouse/logistic/addWarehouse",
                    putWarehouse: "api/cc/warehouse/logistic/updateWarehouse/{0}",
                    editWarehouse: "api/cc/warehouse/logistic/editWarehouse/{0}",
                },
                Regions:{
                    getRegions: "api/cc/warehouse/logistic/regions",
                },
                Support:{
                    getGuia: "guia/allGuia",
                    getFaqs: "faqs/allFaqs",
                },
                Security:{
                    "login": "security/login",
                    "register": "security/register",
                },
                Users:{
                    "profile": "security/profile",
                }
            }
        }
    }
};