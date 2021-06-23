import { Request, Response } from "express";
import BusinessUser from "../businessController/BusinessUser";
import BussinessRoles from "../businessController/BusinnessRoles";
import sha1 from "sha1";
import jsonwebtoken from "jsonwebtoken";
import { IUser } from "../models/Users";

interface Icredentials {
  email: string;
  password: string;
}

class RoutesController {
    constructor() {

    }
    //funcion de login
    public async login(request: Request, response: Response) {
      var credentials: Icredentials = request.body;
      if (credentials.email == undefined) {
        response
          .status(300)
          .json({ serverResponse: "Es necesario el parámetro de email" });
        return;
      }
      if (credentials.password == undefined) {
        response
          .status(300)
          .json({ serverResponse: "Es necesario el parámetro de password" });
        return;
      }
      credentials.password = sha1(credentials.password);
      const user: BusinessUser = new BusinessUser();
      let result: Array<IUser> = await user.readUsers(credentials, 0, 1);
      if (result.length == 1) {
        var loginUser: IUser = result[0];
        var token: string = jsonwebtoken.sign(
          { id: loginUser._id, email: loginUser.email },
          "vladimir"
        );
        response.status(200).json({
          serverResponse: {
            email: loginUser.email,
            username: loginUser.username,
            token,
          },
        });
        return;
      }
      response.status(200).json({ serverResponse: "Credenciales incorrectas" });
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