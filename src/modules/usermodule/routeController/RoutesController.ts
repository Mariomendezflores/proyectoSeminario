import { Request, Response } from "express";
import BusinessUser from "../businessController/BusinessUser";
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
    //ejemplo
    public async isPrime(request: Request, response: Response) {
        const data = request.body;
        var number = Number(data.number);
        for (var i = 2; i < number / 2; i++) {
            if (number % i == 0) {

                return response.status(200).json({ number, msn: "No es primo" });
            }
        }
        return response.status(200).json({ number, msn: "Es primo" })
    }
}
export default RoutesController;