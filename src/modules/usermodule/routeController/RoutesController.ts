import { Request, Response } from "express";
import BusinessUser from "../businessController/BusinessUser";
import BussinessRoles from "../businessController/BusinnessRoles";
import sha1 from "sha1";
import { IUser } from "../models/Users";

class RoutesController {
    constructor() {

    }
    public async createUsers(request: Request, response: Response) {
        var user: BusinessUser = new BusinessUser();
        var userData = request.body;
        userData["registerdate"] = new Date();
        userData["password"] = sha1(userData["password"]);
        let result = await user.addUsers(userData);
        response.status(201).json({ serverResponse: result });
    }
    public async getUsers(request: Request, response: Response) {
        var user: BusinessUser = new BusinessUser();
        const result: Array<IUser> = await user.readUsers();
        response.status(200).json({ serverResponse: result });
    }
    public async updateUsers(request: Request, response: Response) {
        var user: BusinessUser = new BusinessUser();
        let id: string = request.params.id;
        var params = request.body;
        var result = await user.updateUsers(id, params);
        response.status(200).json({ serverResponse: result });
    }
    public async removeUsers(request: Request, response: Response) {
        var user: BusinessUser = new BusinessUser();
        let id: string = request.params.id;
        let result = await user.deleteUsers(id);
        response.status(200).json({ serverResponse: result });
    }


    //funciones para gestionar el rol a los usuarios
    public async addRol(request: Request, response: Response) {
        let idUs: string = request.params.id;
        let idRol = request.body.idRol;
        if (idUs == null && idRol == null) {
          response.status(300).json({
            serverResponse: "No se definio id de usuario ni el id del rol",
          });
          return;
        }
        var user: BusinessUser = new BusinessUser();
        var result = await user.addRol(idUs, idRol);
        if (result == null) {
          response
            .status(300)
            .json({ serverResponse: "El rol o usuario no existen" });
          return;
        }
        response.status(200).json({ serverResponse: result });
      }
      public async createRol(request: Request, response: Response) {
        let roles: BussinessRoles = new BussinessRoles();
        var rolesData: any = request.body;
        let result = await roles.createRol(rolesData);
        if (result == null) {
          response
            .status(300)
            .json({ serverResponse: "El rol tiene parametros no validos" });
          return;
        }
        response.status(201).json({ serverResponse: result });
      }
      public async removeRol(request: Request, response: Response) {
        let roles: BussinessRoles = new BussinessRoles();
        let idRol: string = request.params.id;
        let result = await roles.deleteRol(idRol);
        response.status(201).json({ serverResponse: result });
      }
      public async getRoles(request: Request, response: Response) {
        let roles: BussinessRoles = new BussinessRoles();
        let result = await roles.getListRol();
        response.status(200).json({ serverResponse: result });
      }
      public async removeUserRol(request: Request, response: Response) {
        let roles: BusinessUser = new BusinessUser();
        let idUs: string = request.params.id;
        let idRol: string = request.body.idRol;
        let result = await roles.removeRol(idUs, idRol);
        response.status(200).json({ serverResponse: result });
      }


      
}
export default RoutesController;