import mongoose, { Document, Schema } from "mongoose";
export interface IReunion extends Document {
    idCliente: string,
    idVendedor: string,
    fechaReunion:Date,
    estado:boolean,
    realizado:boolean,
    fechaRegistro:Date
}
const ReunionSchema = new Schema({
    idCliente:{type:String, required:true},
    idVendedor:{type:String, require:true},
    fechaReunion:{type:Date, required:true},
    estado:{type: Boolean},
    realizado:{type:Boolean},
    fechaRegistro:{type:Date}

});
export default mongoose.model<IReunion>("Reuniones", ReunionSchema);