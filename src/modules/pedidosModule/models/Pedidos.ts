import mongoose, {Schema,Document } from 'mongoose';


export interface IPedido extends Document
{
    cliente:string,
    vendedor:string,
    vendedorId:string,
    clienteId:string,
    entrega:Date,
    registerDate:Date
    entregado:boolean,
    montoPago:string,
    uriRecibo?:string,
    pathRecibo?:string,
    tipoPago:string,
    productos?:[
        {
            productoId:string,
            nombre:string,
            cantidad:number,
            costoUnidad:number,
            costoTotal:number,
        }

    ]
}

const pedidoSchema: Schema = new Schema({
    cLiente:{type:String},
    vendedor:{type:String},
    vendedorId:{type:String},
    clienteId:{type:String},
    entrega:Date,
    registerDate:Date,
    uriPedido:{type:String},
    pathPedido:{type:String},
    entregago:{type:Boolean},
    montoPago:{type:String},
    tipoPago:{type:String},
    
    productos:[
        {
            productoId:{type:String},
            nombre:{type:String},
            cantidad:{type:Number},
            costoUnidad:{type:Number},
            costoTotal:{type:Number},
        }

    ]
  
});
export default mongoose.model<IPedido>("Pedidos", pedidoSchema);