import { Request, Response } from "express";
import sha1 from "sha1";
import isEmpty from "is-empty";
import path from "path";
import { ISimpleProducto,IProducto, } from "../models/Productos";
import BusinessProductos from "../pedidosBusinessController/productosBusinessController";
class ProductosRoutesController {
    constructor() {

    }
    //controladores para rutas de los productos

    public async createProducto(request: Request, response: Response) {
        var producto: BusinessProductos = new BusinessProductos();
        var productoData = request.body;
        productoData["registerdate"] = new Date();
        
        let result = await producto.addProducto(productoData);
        response.status(201).json({ serverResponse: result });
    }
    public async getProductos(request: Request, response: Response) {
        var Producto: BusinessProductos = new BusinessProductos();
        const result: Array<IProducto> = await Producto.readAllProductos();
        response.status(200).json({ serverResponse: result });
    }
    public async updateProducto(request: Request, response: Response) {
        var Producto: BusinessProductos = new BusinessProductos();
        let id: string = request.params.id;
        var params = request.body;
        var result = await Producto.updateProducto(id,params);
        response.status(200).json({ serverResponse: result });
    }
    public  async getProductosById(request: Request, response:Response)
    {
        var Producto : BusinessProductos = new BusinessProductos();
        let id:string = request.params.id;
        var result = await Producto.readProducto(id);
        response.status(200).json({ serverResponse: result });
    }
    public async removeProductos(request: Request, response: Response) {
        var Producto:BusinessProductos = new BusinessProductos();
        let id: string = request.params.id;
        let result = await Producto.deleteProducto(id);
        response.status(200).json({ serverResponse: result });
    }
    
    public async uploadImagenProducto(request: Request, response: Response) {
        var id: string = request.params.id;
        if (!id) {
          response
            .status(300)
            .json({ serverResponse: "El id es necesario para subir una foto" });
          return;
        }
        var Producto: BusinessProductos = new BusinessProductos();
        var ProductoToUpdate: IProducto = await Producto.readProducto(id);
        if (!ProductoToUpdate) {
          response.status(300).json({ serverResponse: "El Producto no existe!" });
          return;
        }
        
        if (isEmpty(request.files)) {
          response
            .status(300)
            .json({ serverResponse: "No existe un archivo adjunto" });
          return;
        }
        var dir = `${__dirname}/../../../../ProductosImages`;
        var absolutepath = path.resolve(dir);
        var files: any = request.files;
        /*var file: any = files.portrait;
        if (!file) {
          response.status(300).json({
            serverResponse:
              "error el archivo debe ser subido con el parametro portrait!",
          });
          return;
        }*/
        var key: Array<string> = Object.keys(files);
        /**/
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
          ProductoToUpdate.uriImagen = "/api/getImagenProducto/" + id;
          ProductoToUpdate.pathImagen = totalpath;
          var ProductoResult: IProducto = await ProductoToUpdate.save();
        }
        var simpleProducto: ISimpleProducto = {
        productoName:ProductoResult.productoName,
        precio:ProductoResult.precio,
        stock:ProductoResult.stock,
        disponible:ProductoResult.disponible,
        uriImagen:ProductoResult.uriImagen,
        pathImagen:ProductoResult.pathImagen,
  
        };
        response.status(300).json({ serverResponse: simpleProducto});
        /*file.mv(totalpath, async (err: any, success: any) => {
          if (err) {
            response
              .status(300)
              .json({ serverResponse: "No se pudo almacenar el archivo" });
            return;
          }
          userToUpdate.uriavatar = "/api/getportrait/" + id;
          userToUpdate.pathavatar = totalpath;
          var userResult: IUser = await userToUpdate.save();
          var simpleUser: ISimpleUser = {
            username: userResult.username,
            uriavatar: userResult.uriavatar,
            pathavatar: userResult.pathavatar,
          };
          response.status(300).json({ serverResponse: simpleUser });
        });*/
      }
  
      
      public async getImagenProducto(request: Request, response: Response) {
        var id: string = request.params.id;
        if (!id) {
          response
            .status(300)
            .json({ serverResponse: "Identificador no encontrado" });
          return;
        }
        var Producto: BusinessProductos = new BusinessProductos();
        var ProductoData: IProducto = await Producto.readProducto(id);
        if (!ProductoData) {
          response.status(300).json({ serverResponse: "Error " });
          return;
        }
        if (ProductoData.pathImagen == null) {
          response.status(300).json({ serverResponse: "No existe la imagen " });
          return;
        }
        response.sendFile(ProductoData.pathImagen);
      }
}
export default ProductosRoutesController;