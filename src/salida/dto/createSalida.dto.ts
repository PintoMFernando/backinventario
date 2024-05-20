

import { IsNumber, IsString, Max } from 'class-validator';


export class CreateSalidaDto{
    
   
  

    @IsString()
    idsalida?: string;
     
    @IsNumber()
    cantidad:number;

    @IsNumber()
    @Max(999999.99)
    preciosalida:number;

    @IsNumber()
    preciototal:number;

    @IsNumber()
    descuento?:number ;

    @IsNumber()
    proforma?:number ;

    @IsString()
    idproducto?:string;

   
}