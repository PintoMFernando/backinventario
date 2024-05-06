

import { IsNumber, IsOptional, IsString, Max } from 'class-validator';


export class UpdateEntradaDto{
    
       
 
     
   
    @IsString()
    @IsOptional()
    idsalida?: string;
     
    @IsNumber()
    @IsOptional()
    cantidad:number;

    @IsNumber()
    @Max(999999.99)
    @IsOptional()
    preciosalida:number;

    @IsNumber()
    @Max(999999.99)
    @IsOptional()
    preciototal:number;

    @IsString()
    @IsOptional()
    idproducto?:string;


   
}