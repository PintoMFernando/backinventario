

import { IsNumber, IsOptional, IsString } from 'class-validator';


export class UpdateEntradaDto{
    
       
 
     
   
    @IsString()
    @IsOptional()
    identrada?: string;
     
    @IsNumber()
    @IsOptional()
    cantidad:number;

    @IsString()
    @IsOptional()
    idproducto?:string;


   
}