import RestfulHandler from '../../../../module/handler/restfulHandler';
//import RestfulHandler from '../../../../module/handler/restfulHandler';
import enviroment from '../../../../settings/enviroments';
import { getHeaders } from '.././../../../module/headers'; 

class RoleuserService {
    constructor() {
        const { SoftByteCommerce } = enviroment.api;
        this.service = new RestfulHandler(SoftByteCommerce.url, SoftByteCommerce.timeout);
        this.endpoint = SoftByteCommerce.endpoint.Accesses.RoleUser;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }

    getRollsUsers = async() => {
        const endpoint = this.endpoint.getRolesUsers; 
        const headers = await getHeaders()
        return this.service.request({
          method: 'GET',
          endpoint,
          headers: headers,
        });
    };

    postRollsUsers = async({ user, role, roles = [], superUser = false }) => {
        if (!user || !role) {
            return Promise.reject(new Error("El usuario y el rol son obligatorios"));
        }
    
        const endpoint = this.endpoint.postRolesUsers; 
        const headers = await getHeaders();
    
        return this.service.request({
            method: 'POST',
            endpoint,
            data: {
                user,
                role: parseInt(role), // Convertir a número si es necesario
                roles,
                superUser
            },
            headers: headers,
        });
    };
    

    //Eliminar el Roll asignado al usuario
    DeleteUserRoll = async (idUser, idRol) => {
        if (!idUser || idRol === undefined) {
            console.error("Error: idUser o idRol son inválidos.");
            return Promise.reject(new Error("idUser y idRol no pueden ser nulos o indefinidos"));
        }
    
        // Reemplazar {0} con idUser y {1} con idRol en la URL
        const endpoint = this.endpoint.deleteRoleUser.replace("{0}", idUser).replace("{1}", idRol);
        const headers = await getHeaders();
    
        return this.service.request({
            method: 'DELETE',
            endpoint,
            headers: headers,
        });
    };
    

}

export default RoleuserService;