const { Warehouse } = require("lucide-react");

const environment = "https://localhost:32769/api/cc/warehouse/";
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
                    getCategories: "categorias",
                },
                users:{
                    getUsers: "usuarios",
                },
                sales:{
                    getSales: "ventas",
                },
                Warehouse:{
                    getWarehouse: "bodegas",
                    postWarehouse: "crearBodega",
                    putWarehouse: "logistic/updateWarehouse/{0}",
                }

            }
        }
    }
};