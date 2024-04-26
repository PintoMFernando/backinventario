

import { IsNumber, IsString } from 'class-validator';


export class CreateProductoDto{
    
       
    @IsString()
    idproducto?: string;
     
   
    @IsString()
     nombre?:string ;
  

    @IsString()
    descripcion:string | null;
      
      
    @IsNumber()
    precio:number;

    @IsString()
    codigo:string;

    @IsNumber()
    stock:number;

    @IsString()
    image?:string ;

   
}