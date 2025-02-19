const { Warehouse } = require("lucide-react");

//const environment = "https://localhost:32769/";
//Produccion
const environment = "https://softbyte-commerce-api.onrender.com/";


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
                Accesses:{
                    Actions: "security/action",
                    Aplication: "Seguridad/Apps",
                    Menu:{
                        getMenuByApp: "Seguridad/Menu",
                        getMenuAllApp: "Seguridad/Menu/AllMenu",
                    },
                    Options:{
                        Options: "Seguridad/Option",
                        getRollByUser: "Seguridad/Option/{0}",//UserId
                        putStatusOption: "Seguridad/Option/{0}/{1}",//OptionId/Status
                    },
                    Roll:{
                       getRoll: "Security/Roll",
                       createRoll: "Security/Roll",
                       putRoll: "Security/Roll/{0}/{1}",//RollId/Status
                    },
                    RollOption:{
                        getRollOption: "Security/RoleOption",
                        createRollOption: "Security/RoleOption",
                        deleteRollOption: "Security/RoleOption/{0}",//RollOptionId
                    },
                    RoleUser:{
                        getRoleByUserId: "Security/RoleUser/{0}",//UserId
                        getUserWithRoles: "Security/RoleUser/GetUsersWithRoles",
                        getRolesUsers: "Security/RoleUser",
                        deleteRoleUser: "Security/RoleUser/{0}/{1}",//UserId/RoleUserId
                        createRoleUser: "Security/RoleUser",
                    },
                    Users: "Security/User",//Todos los usuarios de la aplicación,
                    UserOptionAction: "Security/UserOptionAction",
                    UserOption: {
                        getUserOption: "Security/UserOption",
                        getUserOptionByUser: "Security/UserOption/{0}",//UserId
                        postRolOpcionAccion: "Security/UserOption",
                        getUsersWithOptions: "Security/UserOption/GetUsersWithOptions",
                        putUserOption: "Security/UserOption",
                        getOptionByUser: "Security/UserOption/GetOption/{0}",//UserId
                    }
                },
                Users:{
                    "profile": "security/profile",
                }
            }
        }
    }
};