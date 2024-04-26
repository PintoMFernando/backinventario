import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {

     
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
      ) {}
    
      async create(createuserDto: CreateUserDto){
        return await this.userRepository.save(createuserDto);
      }
      
    
      async findAll(iduser:string){
        return await this.userRepository.find();
      }
    
       
      async findAllByIdObservaciones(iduser: number) {
        return await this.userRepository.createQueryBuilder('observaciones')
          .where('observaciones.idmescentralizador = :idcentralizadormes', { iduser })
          .leftJoin('cruge_user', 'cu', 'cu.iduser = :iduser', { iduser: '1' })
      
          .select(['observaciones.*', 'cu.*']) 
          .getRawMany();
      }
  
  async update(iduser:number,observacionessDto:UpdateUserDto): Promise<UpdateResult>{  //EL PROMISE ERA LA CLAVE PARA QUE DE TODOO
    
   
    return await this.userRepository.update(iduser, observacionessDto)
iduser
  }


  async remove(iduser:number){
    return await this.userRepository.softDelete({iduser});
  }






}
