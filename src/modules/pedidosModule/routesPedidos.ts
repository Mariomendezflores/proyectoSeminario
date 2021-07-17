import ProductosControllerRoutes from "./controllerPedidosProductosRoutes/productosRoutesController"
import { Express } from "express";
import PedidosControllerRoutes from "./controllerPedidosProductosRoutes/pedidosRoutesController";
class RoutesModuloPedidos {
    private productosRoutesController: ProductosControllerRoutes;
    private pedidosRoutesController: PedidosControllerRoutes;
    private routeparent: string;
    constructor(routeparent: string, app: Express) {
        this.productosRoutesController = new ProductosControllerRoutes();
        this.pedidosRoutesController = new PedidosControllerRoutes();
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
        
        
        app.route(`${this.routeparent}/pedidos`).post(this.pedidosRoutesController.createPedido);
        
        app.route(`${this.routeparent}/pedidos`).get(this.pedidosRoutesController.getPedidos);
        app.route(`${this.routeparent}/pedidos/:id`).put(this.pedidosRoutesController.updatePedido);
        app.route(`${this.routeparent}/pedidos/:id`).delete(this.pedidosRoutesController.removePedidos);
        app.route(`${this.routeparent}/pedidosVendedor/:id`).get(this.pedidosRoutesController.getPedidosVendedor);
        app.route(`${this.routeparent}/pedido/:id`).get(this.pedidosRoutesController.getPedidosId);  
    }
}

