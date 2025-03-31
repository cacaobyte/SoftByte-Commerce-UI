const { Warehouse } = require("lucide-react");


//Develop
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
                    getArticlesSelectedWarehouse: "api/cc/warehouse/articlesWarehouse/{0}",//WarehouseCode
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
                    createClient: "clients/createClient",
                    updateClient: "clients/updateClient",
                    contactClients: "clients/contacts",
                },
                sales:{
                    getSales: "ventas",
                },
                quotes:{
                    getAllQuotes: "quotes/allQuotes",
                    createQuotes: "quotes/create",
                    getAllQuotesCacaoByte: "quotes/allQuoCacao",
                },
                Warehouse:{
                    getWarehouse: "api/cc/warehouse/bodegas",
                    getWarehouseActive: "api/cc/warehouse/bodegas/active",
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
                    Grouper:{
                       getGrouper: "security/grouper",
                       getGrouperActive: "security/grouper/Active",
                    },
                    Roll:{
                       getRoll: "Security/Roll",
                       getRollActive: "Security/Roll/Active",
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
                        postRolesUsers: "Security/RoleUser",
                        deleteRoleUser: "Security/RoleUser/{0}/{1}",//UserId/RoleId
                        createRoleUser: "Security/RoleUser",
                    },
                    Users:{
                        getUsers: "Security/User",
                        getUsersActive: "Security/User/Active",
                        putUser: "Security/User/{0}",
                        postUser: "security/register",
                    } ,
                    UserOptionAction: "Security/UserOptionAction",
                    UserOption: {
                        getUserOption: "Security/UserOption",
                        getUserOptionByUser: "Security/UserOption/{0}",//UserId
                        postRolOpcionAccion: "Security/UserOption",
                        getUsersWithOptions: "Security/UserOption/GetUsersWithOptions",
                        putUserOption: "Security/UserOption",
                        getOptionByUser: "Security/UserOption/GetOption/{0}",//UserId
                        assingOptionUser: 'Security/UserOption',
                        updateUserOptionStatus: 'Security/UserOption'
                    }
                },
                Users:{
                    "profile": "security/profile",
                }
            }
        }
    }
};
