

import { IsNumber, IsString } from 'class-validator';


export class CreateEntradaDto{
    
   
  

    @IsString()
    identrada?: string;
     
    @IsNumber()
    cantidad:number;

    @IsString()
    idproducto?:string;

   
}