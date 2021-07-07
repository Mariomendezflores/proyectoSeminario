import ProductosControllerRoutes from "./controllerPedidosProductosRoutes/productosRoutesController"
import { Express } from "express";
class RoutesModuloPedidos {
    private productosRoutesController: ProductosControllerRoutes;
    private routeparent: string;
    constructor(routeparent: string, app: Express) {
        this.productosRoutesController = new ProductosControllerRoutes();
        this.routeparent = routeparent;
        this.configureRoutes(app);
    }
    private configureRoutes(app: Express) {
      
        app.route(`${this.routeparent}/productos`).post(this.productosRoutesController.createProducto);
        app.route(`${this.routeparent}/productos`).get(this.productosRoutesController.getProductos);
        app.route(`${this.routeparent}/productos/:id`).put(this.productosRoutesController.updateProducto);
        app.route(`${this.routeparent}/productos/:id`).delete(this.productosRoutesController.removeProductos);
        app.route(`${this.routeparent}/producto/:id`).get(this.productosRoutesController.getProductosById);
        app.route(`${this.routeparent}/uploadImagenProducto/:id`).post(this.productosRoutesController.uploadImagenProducto);
        app.route(`${this.routeparent}/getImagenProducto/:id`).get(this.productosRoutesController.getImagenProducto);        
    }
}
export default RoutesModuloPedidos;