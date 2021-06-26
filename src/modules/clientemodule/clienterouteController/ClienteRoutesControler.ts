import { Request, Response } from "express";
import BussinesCliente from "../clienteBusinessController/BusinessCliente";
import sha1 from "sha1";
import isEmpty from "is-empty";
import path from "path";
//import jsonwebtoken from "jsonwebtoken";
import { ISimpleCliente,ICliente } from "../models/Cliente";
import BusinessCliente from "../clienteBusinessController/BusinessCliente";
class ClienteRoutesController {
    constructor() {

    }
    public async createCliente(request: Request, response: Response) {
        var cliente: BusinessCliente = new BusinessCliente();
        var clienteData = request.body;
        clienteData["registerdate"] = new Date();
        clienteData["password"] = sha1(clienteData["password"]);
        clienteData["idVendedor"] = request.params.id;
        let result = await cliente.addCliente(clienteData);
        response.status(201).json({ serverResponse: result });
    }
    public async getClientes(request: Request, response: Response) {
        var cliente: BusinessCliente = new BusinessCliente();
        const result: Array<ICliente> = await cliente.readAllClientes();
        response.status(200).json({ serverResponse: result });
    }
    public async updateCliente(request: Request, response: Response) {
        var cliente: BusinessCliente = new BusinessCliente();
        let id: string = request.params.id;
        var params = request.body;
        var result = await cliente.updateCliente(id,params);
        response.status(200).json({ serverResponse: result });
    }
    public  async getClientesByVendedor(request: Request, response:Response)
    {
        var cliente : BusinessCliente = new BussinesCliente();
        let id:string = request.params.id;
        var result:Array<ICliente>= await cliente.readClientesPorVendedor(id);
        response.status(200).json({ serverResponse: result });
    }
    public  async getClientesById(request: Request, response:Response)
    {
        var cliente : BusinessCliente = new BussinesCliente();
        let id:string = request.params.id;
        var result = await cliente.readOneCliente(id);
        response.status(200).json({ serverResponse: result });
    }
    public async removeClientes(request: Request, response: Response) {
        var cliente:BussinesCliente = new BusinessCliente();
        let id: string = request.params.id;
        let result = await cliente.deleteCliente(id);
        response.status(200).json({ serverResponse: result });
    }    
}
export default ClienteRoutesController;