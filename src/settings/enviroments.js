const { Warehouse } = require("lucide-react");

const environment = "https://localhost:32771/api/cc/warehouse/";
//Produccion
//const environment = "https://softbyte-commerce-api.onrender.com/api/cc/warehouse/";


module.exports = {
    api: {
        SoftByteCommerce: {
            url: environment, 
            timeout: 900000,
            endpoint: {
                articles:{
                    getAllArticles: "articulosTodos",
                    getArticles: "articulos",
                    getArticlesWholesale: "articulosMayoreo",
                    postArticles: "crearArticulos",
                    /*Pendientes
                    Actualizar articulos
                    desactivar acticulos
                    */
                },
                categories:{
                    getCategories: "logistic/categories",
                    getCategoriesSubCategories: "logistic/categoriesSubCategories",
                },
                users:{
                    getUsers: "usuarios",
                },
                sales:{
                    getSales: "ventas",
                },
                Warehouse:{
                    getWarehouse: "bodegas",
                    CreateWarehouse: "logistic/addWarehouse",
                    putWarehouse: "logistic/updateWarehouse/{0}",
                    editWarehouse: "logistic/editWarehouse/{0}",
                },
                Regions:{
                    getRegions: "logistic/regions",
                }
            }
        }
    }
};