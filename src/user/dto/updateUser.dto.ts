

import { IsNumber, IsOptional, IsString } from 'class-validator';


export class UpdateUserDto{
    
       
        
    @IsNumber()
    @IsOptional() 
    iduser?: number;
     
   
    @IsString()
    @IsOptional()
     username?:string ;
  

    @IsString()
    @IsOptional()
    password:string | null;
      
      
    @IsString()
    @IsOptional()
    email:string;

    @IsNumber()
    @IsOptional()
    tipo:number;

    

    @IsString()
    @IsOptional()
    authkey?:string ;

   
}