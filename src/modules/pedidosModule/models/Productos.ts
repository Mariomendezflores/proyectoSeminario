import mongoose, { Schema, Document } from "mongoose";

export interface ISimpleProducto {
  productoName: string,
  registerdate?: Date,
  precio:string,
  stock:string,
  disponible?:boolean,
  uriImagen?: string,
  pathImagen?: string,
}
export interface IProducto extends Document {
  productoName: string,
  registerdate?: Date,
  precio:string,
  stock:string,
  disponible?:boolean,
  uriImagen?: string,
  pathImagen?: string,
 
  
  
}
const productoSchema: Schema = new Schema({
    productoName:{type:String},
    registerdate: {type:Date},
    precio:{type:String},
    stock:{type:String},
    disponible:{type:Boolean},
    uriImagen:{type:String},
    pathImagen: {type:String},
  
});
export default mongoose.model<IProducto>("Productos", productoSchema);