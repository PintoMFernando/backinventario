

import { IsNumber, IsString } from 'class-validator';


export class CreateProformaDto{
    

    @IsString()
    idproforma: string;
     
    @IsString()
    nombre?:string ;

    @IsString()
    ci?:string ;

    @IsNumber()
    telefono?:number ;

    @IsNumber()
    estado?: number;

    @IsNumber()
    tipo?: number;


    @IsString()
    idsalida?:string;
  

   
}