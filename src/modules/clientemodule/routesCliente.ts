import ClienteRoutesController from "./clienterouteController/ClienteRoutesControler"
//import jsonwebtokenSecurity from "./middleware";
import { Express } from "express";
class RoutesCliente {
    private routesController: ClienteRoutesController;
    private routeparent: string;
    constructor(routeparent: string, app: Express) {
        this.routesController = new ClienteRoutesController();
        this.routeparent = routeparent;
        this.configureRoutes(app);
    }
    private configureRoutes(app: Express) {
        app.route(`${this.routeparent}/clientes/:id`).post(this.routesController.createCliente);
        //leera la informacion de un conjunto de usuarios
        app.route(`${this.routeparent}/clientes`).get(this.routesController.getClientes);
        app.route(`${this.routeparent}/clientes/:id`).put(this.routesController.updateCliente);
        app.route(`${this.routeparent}/clientes/:id`).delete(this.routesController.removeClientes);
        app.route(`${this.routeparent}/clientesVendedor/:id`).get(this.routesController.getClientesByVendedor);
        app.route(`${this.routeparent}/cliente/:id`).delete(this.routesController.getClientesById);

                
    }
}
export default RoutesCliente;