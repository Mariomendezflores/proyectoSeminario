import { Express } from "express";
import cualquierNombrealImportar from "./routesCliente";
class ClienteModule {
    private routes: cualquierNombrealImportar;
    constructor(root: string, app: Express) {
        console.log("Init cliente module");
        this.routes = new cualquierNombrealImportar(root, app);

    }
}
export default ClienteModule;