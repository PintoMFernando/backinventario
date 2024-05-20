

import { IsNumber, IsOptional, IsString } from 'class-validator';


export class UpdateProformaDto{
    
   
     
    @IsString()
    @IsOptional()
    idproforma: string;
     
    @IsString()
    @IsOptional()
    nombre?:string ;

    @IsString()
    @IsOptional()
    ci?:string ;

    @IsNumber()
    @IsOptional()
    telefono?:number ;

    @IsNumber()
    @IsOptional()
    estado?: number;

    @IsNumber()
    @IsOptional()
    tipo?: number;


    @IsString()
    @IsOptional()
    idsalida?:string;

   
}