

import { IsNumber, IsString } from 'class-validator';


export class CreateEntradaDto{
    
   
  

    @IsString()
    identrada?: string;
     
    @IsNumber()
    cantidad:number;

    @IsNumber()
    precioentrada:number;

    @IsString()
    idproducto?:string;

   
}