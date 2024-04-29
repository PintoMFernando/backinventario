

import { IsNumber, IsOptional, IsString } from 'class-validator';


export class UpdateProductoDto{
    
       
    @IsString()
    @IsOptional()
    idproducto?: string;
     
   
    @IsString()
    @IsOptional()
     nombre?:string ;
  

    @IsString()
    @IsOptional()
    descripcion:string | null;
      
      
    @IsNumber()
    @IsOptional()
    precio:number;

    @IsString()
    @IsOptional()
    codigo:string;

    @IsNumber()
    @IsOptional()
    stock:number;

    @IsString()
    @IsOptional()
    image?:string ;

   
}