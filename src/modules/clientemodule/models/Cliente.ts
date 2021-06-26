import mongoose, { Schema, Document } from "mongoose";
//import  { IReunion } from "./Reunion";

export interface ISimpleCliente {
  nombre: string,
  apellidos:string,
  email: string,
  password?: string;
  telefono:string,
  ci:string,
  registerdate: Date,
  zona?:string,
  calleNumero:string,
  tipoCliente:string,
  clienteRegular:boolean,
  clientePotencial:boolean,
  probabilidadCaptacion:Number,
  ubicacionLong:string,
  ubicacionLat:string,
  estadoCliente:boolean,
  uriavatar?: string,
  pathavatar?: string,
  idVendedor:string
}
export interface ICliente extends Document {
  
  nombre: string,
  apellidos:string,
  email: string,
  password?: string,
  telefono:string,
  ci:string,
  registerdate: Date,
  zona?:string,
  calleNumero:string,
  tipoCliente:string,
  clienteRegular:boolean,
  clientePotencial:boolean,
  probabilidadCaptacion:Number,
  ubicacionLong:string,
  ubicacionLat:string,
  estadoCliente:boolean,
  uriavatar?: string,
  pathavatar?: string,
  idVendedor:string
  
}
const clienteSchema: Schema = new Schema({
  nombre: { type: String, required: true},
  apellidos: {type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  telefono: { type: String, required: true },
  ci:{ type: String, required: true, unique:true },
  registerdate: { type: Date, required: true },
  zona:{ type: String},
  calleNumero:{ type: String},
  tipoCliente:{ type: String},
  clienteRegular:{ type: Boolean},
  clientePotencial:{ type: Boolean},
  probabilidadCaptacion:{ type: Number},
  ubicacionLong:{ type: String},
  ubicacionLat:{ type: String},
  estadoCliente:{type:Boolean},
  uriavatar: { type: String },
  pathavatar: { type: String },
  idVendedor:{type:String}
});
export default mongoose.model<ICliente>("Cliente", clienteSchema);