import ProductosModel, { IProducto } from "../models/Productos";
class BusinessProductos{
    constructor() {

    }
    //fuciones para conectar a la base de datos
    public async readAllProductos()
    {
        let result = await ProductosModel.find({});
        return result;
    }
    public async readProducto(id:string)
    {
        let result = await ProductosModel.findById(id).exec();
        return result;
    }
    public async addProducto(cliente: IProducto) {
        let productoDb = new ProductosModel(cliente);
        let result = await productoDb.save();
        return result;
    }
    public async updateProducto(id: string, cliente: any) {
        let result = await ProductosModel.update({ _id: id }, { $set: cliente });
        return result;
    }
    public async deleteProducto(id: string) {
        let result = await ProductosModel.remove({ _id: id });
        return result;
    }

}
export default BusinessProductos;