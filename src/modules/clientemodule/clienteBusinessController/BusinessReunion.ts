import ReunionModel, { IReunion } from "../models/Reunion";

class BusinessReunion
{
    constructor()
    {

    }
    // crud para reuniones
    public async readAllReuniones()
    {
        let result = await ReunionModel.find({});
        return result;
    }
    public async readOneReunion(id:string)
    {
        let result = await ReunionModel.findById(id).exec();
        return result;
    }
    public async readReunionesPorVendedor(idVen:string)
    {
        let result = await ReunionModel.find({idVendedor:idVen});
        return result;
    }
    public async addReunion(reunion:IReunion)
    {
        let reunionDb = new ReunionModel(reunion);
        let result = await reunionDb.save();
        return result;
    }
    public async updateReunion(id: string, reunion: any) {
        let result = await ReunionModel.update({ _id: id }, { $set: reunion });
        return result;
    }
    public async deleteReunion(id: string) {
        let result = await ReunionModel.remove({ _id: id });
        return result;
    }
}
export default BusinessReunion;