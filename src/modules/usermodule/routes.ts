import RoutesController from "./routeController/RoutesController";
import { Express } from "express";
class Routes {
    private routesController: RoutesController;
    private routeparent: string;
    constructor(routeparent: string, app: Express) {
        this.routesController = new RoutesController();
        this.routeparent = routeparent;
        this.configureRoutes(app);
    }
    private configureRoutes(app: Express) {
        //creara un usuario nuevo
        app.route(`${this.routeparent}/users`).post(this.routesController.createUsers);
        //leera la informacion de un conjunto de usuarios
        app.route(`${this.routeparent}/users`).get(this.routesController.getUsers);
        app.route(`${this.routeparent}/users/:id`).put(this.routesController.updateUsers);
        app.route(`${this.routeparent}/users/:id`).delete(this.routesController.removeUsers);

        //app.route(`${this.routeparent}/isprime`).post(this.routesController.isPrime);
    }
}
export default Routes;