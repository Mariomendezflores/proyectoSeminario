import { Request, Response } from "express";
import sha1 from "sha1";
import isEmpty from "is-empty";
import path from "path";
//import jsonwebtoken from "jsonwebtoken";
import { ISimpleCliente,ICliente } from "../models/Cliente";
import BusinessCliente from "../clienteBusinessController/BusinessCliente";
import BusinessReunion from "../clienteBusinessController/BusinessReunion";
import { IReunion } from "../models/Reunion";
class ClienteRoutesController {
    constructor() {

    }
    //funciones para gestionar clientes

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
        var cliente : BusinessCliente = new BusinessCliente();
        let id:string = request.params.id;
        var result:Array<ICliente>= await cliente.readClientesPorVendedor(id);
        response.status(200).json({ serverResponse: result });
    }
    public  async getClientesById(request: Request, response:Response)
    {
        var cliente : BusinessCliente = new BusinessCliente();
        let id:string = request.params.id;
        var result = await cliente.readOneCliente(id);
        response.status(200).json({ serverResponse: result });
    }
    public async removeClientes(request: Request, response: Response) {
        var cliente:BusinessCliente = new BusinessCliente();
        let id: string = request.params.id;
        let result = await cliente.deleteCliente(id);
        response.status(200).json({ serverResponse: result });
    }
    
    //funciones para gestionar reuniones

    public async createReunion(request: Request, response: Response) {
        var reunion: BusinessReunion = new BusinessReunion();
        var reunionData = request.body;
        reunionData["fechaRegistro"] = new Date();
        reunionData["idCliente"] = request.params.idC;
        reunionData["idVendedor"] = request.params.idV;
        let result = await reunion.addReunion(reunionData);
        response.status(201).json({ serverResponse: result });
    }
    public async getReuniones(request: Request, response: Response) {
        var reunion: BusinessReunion = new BusinessReunion();
        const result: Array<IReunion> = await reunion.readAllReuniones();
        response.status(200).json({ serverResponse: result });
    }
    public async updateReunion(request: Request, response: Response) {
        var reunion: BusinessReunion = new BusinessReunion();
        let id: string = request.params.id;
        var params = request.body;
        var result = await reunion.updateReunion(id,params);
        response.status(200).json({ serverResponse: result });
    }
    public  async getReunionesByVendedor(request: Request, response:Response)
    {
        var reunion : BusinessReunion = new BusinessReunion();
        let id:string = request.params.idVen;
        var result:Array<IReunion>= await reunion.readReunionesPorVendedor(id);
        response.status(200).json({ serverResponse: result });
    }
    public  async getReunionById(request: Request, response:Response)
    {
        var reunion : BusinessReunion = new BusinessReunion();
        let id:string = request.params.id;
        var result = await reunion.readOneReunion(id)
        response.status(200).json({ serverResponse: result });
    }
    public async removeReunion(request: Request, response: Response) {
        var reunion:BusinessReunion = new BusinessReunion();
        let id: string = request.params.id;
        let result = await reunion.deleteReunion(id);
        response.status(200).json({ serverResponse: result });
    }

}
export default ClienteRoutesController;