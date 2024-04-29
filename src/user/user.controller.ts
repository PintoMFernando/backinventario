import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
export class UserController {
   
    constructor(private readonly userService: UserService){}


   @Get('/:iduser')
   findAllByIdObservaciones(@Param('iduser') iduser: number) {
      return   this.userService.findAllByIdObservaciones(iduser);
   }

   @Post()
    create( @Body() observacionesDto: CreateUserDto) {
       // console.log("entra a post");
        return this.userService.create( observacionesDto); 
    }

   @Patch('/:iduser')
    update(@Param('iduser') iduser: number, @Body() updateuserDto: UpdateUserDto) {
         return this.userService.update(iduser, updateuserDto);
     }


     @Delete('/:iduser')
     remove(@Param('iduser') iduser: number){
       // console.log("aqui esta",idobservaciones);
        return this.userService.remove(iduser);
     }  

     




}
