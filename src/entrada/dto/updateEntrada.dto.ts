

import { IsNumber, IsOptional, IsString } from 'class-validator';


export class UpdateEntradaDto{
    
       
 
     
   
    @IsString()
    @IsOptional()
    identrada?: string;
     
    @IsNumber()
    @IsOptional()
    cantidad:number;

    @IsNumber()
    @IsOptional()
    precioentrada:number;

    @IsString()
    @IsOptional()
    detalle?:string ;

    @IsString()
    @IsOptional()
    idproducto?:string;

    @IsNumber()
    @IsOptional()
    tipo?:number;


   
}