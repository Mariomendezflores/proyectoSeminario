import PedidosModel, { IPedido } from "../models/Pedidos";
class BusinessPedidos{
    constructor() {

    }
    public async readAllPedidos()
    {
        let result = await PedidosModel.find({});
        return result;
    }
    public async readPedido(id:string)
    {
        let result = await PedidosModel.findById(id).exec();
        return result;
    }
    public async readPedidosByVendedor(idVen:string)
    {
        let result = await PedidosModel.find({vendedorId:idVen});
        return result;
    }
    public async addPedido(pedido: IPedido) {
        let pedidoDb = new PedidosModel(pedido);
        let result = await pedidoDb.save();
        return result;
    }
    public async updatePedido(id: string, pedido: any) {
        let result = await PedidosModel.update({ _id: id }, { $set: pedido });
        return result;
    }
    public async deletePedido(id: string) {
        let result = await PedidosModel.remove({ _id: id });
        return result;
    }

}
export default BusinessPedidos;