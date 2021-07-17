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
        //rutas para clientes
        app.route(`${this.routeparent}/clientes/:id`).post(this.routesController.createCliente);
        
        app.route(`${this.routeparent}/clientes`).get(this.routesController.getClientes);
        app.route(`${this.routeparent}/clientes/:id`).put(this.routesController.updateCliente);
        app.route(`${this.routeparent}/clientes/:id`).delete(this.routesController.removeClientes);
        app.route(`${this.routeparent}/clientesVendedor/:id`).get(this.routesController.getClientesByVendedor);
        app.route(`${this.routeparent}/cliente/:id`).get(this.routesController.getClientesById);

        app.route(`${this.routeparent}/clientesPotencialesVendedor/:id`).get(this.routesController.getClientesPotencialesByVendedor);
        app.route(`${this.routeparent}/clientesRegularesVendedor/:id`).get(this.routesController.getClientesRegularesByVendedor);

            app.route(`${this.routeparent}/clientesRegulares`).get(this.routesController.getClientesRegulares);
            app.route(`${this.routeparent}/clientesPotenciales`).get(this.routesController.getClientesPotenciales);
            app.route(`${this.routeparent}/uploadClienteImagen/:id`).post(this.routesController.uploadImagenCliente);
            app.route(`${this.routeparent}/getImagenCliente/:id`).get(this.routesController.getImagenCliente);

        //rutas para reuniones
        app.route(`${this.routeparent}/reuniones/:idC/:idV`).post(this.routesController.createReunion);
        app.route(`${this.routeparent}/reuniones`).get(this.routesController.getReuniones);
        app.route(`${this.routeparent}/reuniones/:id`).put(this.routesController.updateReunion);
        app.route(`${this.routeparent}/reuniones/:id`).delete(this.routesController.removeReunion);
        app.route(`${this.routeparent}/reunionesVendedor/:idVen`).get(this.routesController.getReunionesByVendedor);
        app.route(`${this.routeparent}/reunion/:id`).get(this.routesController.getReunionById);

                
    }
}
export default RoutesCliente;