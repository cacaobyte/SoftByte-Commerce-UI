
const environment = "https://apiumgcollab.onrender.com";


module.exports = {
    api: {
        SoftByteCommerce: {
            url: environment, 
            timeout: 900000,
            endpoint: {
                articles:{
                    getArticles: "/articulos",
                },
                categories:{
                    getCategories: "/categorias",
                },
                users:{
                    getUsers: "/usuarios",
                },
                sales:{
                    getSales: "/ventas",
                },

            }
        }
    }
};