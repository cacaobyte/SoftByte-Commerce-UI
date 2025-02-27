import RestfulHandler from '../../../../module/handler/restfulHandler';
import enviroment from '../../../../settings/enviroments';
import { getHeaders, getToken } from '.././../../../module/headers'; 

class UsersService {
    constructor() {
        const { SoftByteCommerce } = enviroment.api;
        this.service = new RestfulHandler(SoftByteCommerce.url, SoftByteCommerce.timeout);
        this.endpoint = SoftByteCommerce.endpoint.Accesses.Users;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }

    getAllUsers = async() => {
        const endpoint = this.endpoint.getUsers; 
        const headers = await getHeaders()
        return this.service.request({
          method: 'GET',
          endpoint,
          headers: headers,
        });
    };

    getAllUsersActive = async() => {
        const endpoint = this.endpoint.getUsersActive; 
        const headers = await getHeaders()
        return this.service.request({
          method: 'GET',
          endpoint,
          headers: headers,
        });
    };


        UpdateStatusUser = async (idUser) => {
          if (!idUser ) {
              return Promise.reject(new Error("idUser no puede ser nulo o indefinido"));
          }
      
          const endpoint = this.endpoint.putUser.replace("{0}", idUser);
          const headers = await getHeaders();
      
          return this.service.request({
              method: 'PUT',
              endpoint,
              headers: headers,
          });
      };
      

        /**
         * Crea un nuevo usuario
         * @param {FormData} UsersData -
         */
        createUsers = async (UsersData) => {
            try {
              const token = await getToken(); 
              return this.service.request({
                method: 'POST',
                endpoint: this.endpoint.postUser,
                data: UsersData,
                headers: {
                  Token: token, 
                },
              });
            } catch (error) {
              console.error('Error al crear el usuario:', error);
              throw error;
         }
        };


}

export default UsersService;

