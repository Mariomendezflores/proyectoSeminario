import { Request, Response } from "express";
import sha1 from "sha1";
import isEmpty from "is-empty";
import path from "path";
import { IPedido, } from "../models/Pedidos";
import BusinessPedidos from "../pedidosBusinessController/pedidosBusinessController";
class PedidosRoutesController {
    constructor() {

    }

    public async createPedido(request: Request, response: Response) {
        var Pedido: BusinessPedidos = new BusinessPedidos();
        var PedidoData = request.body;
        PedidoData["registerDate"] = new Date();
        
        let result = await Pedido.addPedido(PedidoData);
        response.status(201).json({ serverResponse: result });
    }
    public async getPedidos(request: Request, response: Response) {
        var Pedido: BusinessPedidos = new BusinessPedidos();
        const result: Array<IPedido> = await Pedido.readAllPedidos();
        response.status(200).json({ serverResponse: result });
    }
    public async updatePedido(request: Request, response: Response) {
        var Pedido: BusinessPedidos = new BusinessPedidos();
        let id: string = request.params.id;
        var params = request.body;
        var result = await Pedido.updatePedido(id,params);
        response.status(200).json({ serverResponse: result });
    }
    public  async getPedidosVendedor(request: Request, response:Response)
    {
        var Pedido : BusinessPedidos = new BusinessPedidos();
        let vendedorId:string = request.params.vendedorId;
        var result:Array<IPedido>= await Pedido.readPedidosByVendedor(vendedorId);
        response.status(200).json({ serverResponse: result });
    }
    public  async getPedidosId(request: Request, response:Response)
    {
        var Pedido : BusinessPedidos = new BusinessPedidos();
        let id:string = request.params.id;
        var result = await Pedido.readPedido(id);
        response.status(200).json({ serverResponse: result });
    }
    public async removePedidos(request: Request, response: Response) {
        var Pedido:BusinessPedidos = new BusinessPedidos();
        let id: string = request.params.id;
        let result = await Pedido.deletePedido(id);
        response.status(200).json({ serverResponse: result });
    }
    
    public async uploadReciboPedido(request: Request, response: Response) {
        var id: string = request.params.id;
        if (!id) {
          response
            .status(300)
            .json({ serverResponse: "El id es necesario para subir una el recibo" });
          return;
        }
        var Pedido: BusinessPedidos = new BusinessPedidos();
        var PedidoToUpdate: IPedido = await Pedido.readPedido(id);
        if (!PedidoToUpdate) {
          response.status(300).json({ serverResponse: "El Pedido no existe!" });
          return;
        }
        
        if (isEmpty(request.files)) {
          response
            .status(300)
            .json({ serverResponse: "No existe un archivo adjunto" });
          return;
        }
        var dir = `${__dirname}/../../../../RecibosPedidos`;
        var absolutepath = path.resolve(dir);
        var files: any = request.files;
        
        var key: Array<string> = Object.keys(files);
        var copyDirectory = (totalpath: string, file: any) => {
          return new Promise((resolve, reject) => {
            file.mv(totalpath, (err: any, success: any) => {
              if (err) {
                resolve(false);
                return;
              }
              resolve(true);
              return;
            });
          });
        };
        for (var i = 0; i < key.length; i++) {
          var file: any = files[key[i]];
          var filehash: string = sha1(new Date().toString()).substr(0, 7);
          var newname: string = `${filehash}_${file.name}`;
          var totalpath = `${absolutepath}/${newname}`;
          await copyDirectory(totalpath, file);
          PedidoToUpdate.uriRecibo = "/api/getImagenPedido/" + id;
          PedidoToUpdate.pathRecibo = totalpath;
          var PedidoResult: IPedido = await PedidoToUpdate.save();
        }
        var simplePedido= PedidoResult;
        response.status(300).json({ serverResponse: simplePedido});
        
      }
  
      public async getArchivoRecibo(request: Request, response: Response) {
        var id: string = request.params.id;
        if (!id) {
          response
            .status(300)
            .json({ serverResponse: "Identificador no encontrado" });
          return;
        }
        var Pedido: BusinessPedidos = new BusinessPedidos();
        var PedidoData: IPedido = await Pedido.readPedido(id);
        if (!PedidoData) {
          response.status(300).json({ serverResponse: "Error " });
          return;
        }
        if (PedidoData.pathRecibo == null) {
          response.status(300).json({ serverResponse: "No existe el archivo " });
          return;
        }
        response.sendFile(PedidoData.pathRecibo);
      }
}
export default PedidosRoutesController;