

import { IsNumber, IsString } from 'class-validator';


export class CreateUserDto{
    
       
    @IsNumber()
    iduser?: number;
     
   
    @IsString()
     username?:string ;
  

    @IsString()
    password:string | null;
      
      
    @IsString()
    email:string;

    @IsNumber()
    
    tipo:number;

    

    @IsString()
    authkey?:string ;

   
}