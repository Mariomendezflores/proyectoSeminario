import ClienteModel, { ICliente } from "../models/Cliente";
import ReunionModel, { IReunion } from "../models/Reunion";
class BusinessCliente{
    constructor() {

    }
    //crud cliente
    public async readAllClientes()
    {
        let result = await ClienteModel.find({});
        return result;
    }
    public async readOneCliente(id:string)
    {
        let result = await ClienteModel.findById(id).exec();
        return result;
    }
    public async readClientesPorVendedor(idVen:string)
    {
        let result = await ClienteModel.find({idVendedor:idVen});
        return result;
    }
    public async addCliente(cliente: ICliente) {
        let clienteDb = new ClienteModel(cliente);
        let result = await clienteDb.save();
        return result;
    }
    public async updateCliente(id: string, cliente: any) {
        let result = await ClienteModel.update({ _id: id }, { $set: cliente });
        return result;
    }
    public async deleteCliente(id: string) {
        let result = await ClienteModel.remove({ _id: id });
        return result;
    }

}
export default BusinessCliente;