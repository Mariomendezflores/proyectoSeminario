import { Express } from "express";
import RutasModuloPedidos from "./routesPedidos";
class ModuloPedidos {
    private routes: RutasModuloPedidos;
    constructor(root: string, app: Express) {
        console.log("Init cliente module");
        this.routes = new RutasModuloPedidos(root, app);

    }
}
export default ModuloPedidos;